import express, { Request, Response, NextFunction } from 'express';
import adminRouter from './admin/admin';
import userRouter from './user/user';

const router = express();

router.use('/admin', adminRouter);
router.use('/user', userRouter);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) res.redirect('/');
    else {
        if (req.session.user === "admin")
            res.redirect('/files/admin');
        else
            res.redirect('/files/user');
    }
});

export default router;