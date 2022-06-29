import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as path from 'path';
import { randomBytes } from 'crypto';
import indexRouter from './routes/index';
import fileRouter from './routes/files';
import logoutRouter from './routes/logout';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());

app.use('/', indexRouter);
app.use('/files', fileRouter);
app.use('/logout', logoutRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
