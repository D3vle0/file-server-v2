import express, { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { formidable } from 'formidable';

const router = express();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) req.session.user = "user";
    fs.readdir(path.resolve(__dirname, '../../../public/user'), (err: any, filelist: any[]) => {
        res.render('folder', { user: req.session.user, location: "user", filelist: filelist });
    })
});

router.post('/upload', (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        //@ts-ignore
        const form = new formidable.IncomingForm();
        form.parse(req, (err: any, fields: any, files: any) => {
            const oldpath = files.file.filepath;
            console.log(oldpath)
            const newpath = path.resolve(__dirname, `../../../public/user/${files.file.originalFilename}`);
            fs.rename(oldpath, newpath, (err: any) => {
                if (err) res.redirect("/");
                res.redirect(`/files/user/`);
                res.end();
            });
        });
    }
});

export default router;