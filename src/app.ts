import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { formidable } from 'formidable';
import { randomBytes } from 'crypto';

const app = express();
const PORT = 1234;
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) res.render('index', { user: req.session.user });
    else res.redirect('/files');
});

app.post('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id === process.env.ADMIN_ID && req.body.pw === process.env.ADMIN_PW) {
        req.session.user = "admin";
        res.redirect('/');
    }
});

app.get('/files', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) res.redirect('/');
    else {
        if (req.session.user === "admin")
            res.redirect('/files/admin');
        else
            res.redirect('/files/user');
    }
});

app.get('/files/admin', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user || req.session.user == "user") res.send(`<script>alert("허용되지 않은 접근입니다.");window.location.href="/";</script>`);
    else {
        fs.readdir(path.resolve(__dirname, '../public/admin'), (err: any, filelist: any[]) => {
            res.render('folder', { user: req.session.user, location: "admin", filelist: filelist });
        })
    }
});

app.get('/files/admin/:folder', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        fs.readdir(path.resolve(__dirname, '../public/admin/' + req.params.folder), (err: any, filelist: any[]) => {
            res.render('folder', { user: req.session.user, location: `/${req.session.user}/${req.params.folder}`, filelist: filelist });
        })
    }
    else
        res.redirect('/');
});

app.post('/files/admin/:folder/upload', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user === "admin") {
        //@ts-ignore
        const form = new formidable.IncomingForm();
        form.parse(req, (err: any, fields: any, files: any) => {
            const oldpath = files.file.filepath;
            console.log(oldpath)
            const newpath = path.resolve(__dirname, `../public/admin/${req.params.folder}/${files.file.originalFilename}`);
            fs.rename(oldpath, newpath, (err: any) => {
                if (err) res.redirect("/");
                res.redirect(`/files/admin/${req.params.folder}`);
                res.end();
            });
        });
    }
});

app.get('/files/user', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) req.session.user = "user";
    fs.readdir(path.resolve(__dirname, '../public/user'), (err: any, filelist: any[]) => {
        res.render('folder', { user: req.session.user, location: "user", filelist: filelist });
    })
});

app.post('/files/user/upload', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        //@ts-ignore
        const form = new formidable.IncomingForm();
        form.parse(req, (err: any, fields: any, files: any) => {
            const oldpath = files.file.filepath;
            console.log(oldpath)
            const newpath = path.resolve(__dirname, `../public/user/${files.file.originalFilename}`);
            fs.rename(oldpath, newpath, (err: any) => {
                if (err) res.redirect("/");
                res.redirect(`/files/user/`);
                res.end();
            });
        });
    }
});

app.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    delete req.session.user;
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server on`);
});
