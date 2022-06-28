import express, { Request, Response, NextFunction } from 'express';

const router = express();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    delete req.session.user;
    res.redirect('/');
});

export default router;