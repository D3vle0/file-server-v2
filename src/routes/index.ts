import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const router = express();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) res.render('index', { user: req.session.user });
    else res.redirect('/files');
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id === process.env.ADMIN_ID && req.body.pw === process.env.ADMIN_PW) {
        req.session.user = "admin";
        res.redirect('/');
    }
});

export default router;