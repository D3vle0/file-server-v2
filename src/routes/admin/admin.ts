import express, { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { formidable } from 'formidable';

const router = express();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user || req.session.user == "user") res.send(`<script>alert("허용되지 않은 접근입니다.");window.location.href="/";</script>`);
    else {
        fs.readdir(path.resolve(__dirname, '../../../public/admin'), (err: any, filelist: any[]) => {
            res.render('folder', { user: req.session.user, location: "admin", filelist: filelist });
        })
    }
});

router.get('/:folder', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        fs.readdir(path.resolve(__dirname, '../../../public/admin/' + req.params.folder), (err: any, filelist: any[]) => {
            res.render('folder', { user: req.session.user, location: `/${req.session.user}/${req.params.folder}`, filelist: filelist });
        })
    }
    else
        res.redirect('/');
});

router.post('/:folder/upload', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user === "admin") {
        //@ts-ignore
        const form = new formidable.IncomingForm();
        form.parse(req, (err: any, fields: any, files: any) => {
            const oldpath = files.file.filepath;
            console.log(oldpath)
            const newpath = path.resolve(__dirname, `../../../public/admin/${req.params.folder}/${files.file.originalFilename}`);
            fs.rename(oldpath, newpath, (err: any) => {
                if (err) res.redirect("/");
                res.redirect(`/files/admin/${req.params.folder}`);
                res.end();
            });
        });
    }
});

export default router;