import express, { Request, Response, NextFunction } from 'express';
import info from './info';
import login from './login';
import register from './register';
import pwReset from './pwReset';
import withDraw from './withDraw';
import meal from './meal';
import timetable from './timetable';
import search from './book/search';
import addBook from './book/addBook';
import deleteBook from './book/deleteBook';
import history from './book/history';
import loanAction from './book/loanAction';
import returnAction from './book/returnAction';
import viewCalendar from './calendar/viewCalendar';
import addCalendar from './calendar/addCalendar';
import deleteCalendar from './calendar/deleteCalendar';
import modifyCalendar from './calendar/modifyCalendar';
import viewDKNews from './dknews/viewDKNews';
import { jwtToken } from '../token';
import * as dotenv from 'dotenv';
import { jwtTokenType } from '../types';
import path from 'path';

dotenv.config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use('/api/info', info);
router.use('/api/login', login);
router.use('/api/register', register);
router.use('/api/pwReset', pwReset);
router.use('/api/withDraw', withDraw);
router.use('/api/meal', meal);
router.use('/api/timetable', timetable);
router.use('/api/book/search', search);
router.use('/api/book/addBook', addBook);
router.use('/api/book/deleteBook', deleteBook);
router.use('/api/book/history', history);
router.use('/api/book/loanAction', loanAction);
router.use('/api/book/returnAction', returnAction);
router.use('/api/calendar/viewCalendar', viewCalendar);
router.use('/api/calendar/addCalendar', addCalendar);
router.use('/api/calendar/deleteCalendar', deleteCalendar);
router.use('/api/calendar/modifyCalendar', modifyCalendar);

router.use('/api/dknews_jpg', express.static(path.join(__dirname,'dknews_jpg')));
router.use('/api/dknews/viewDKNews', viewDKNews);

router.post('/api/token', async (req: Request, res: Response, next: NextFunction) => {
    const { token }: { token: string } = Object.assign(req.body, req.query);
    const result: { isError: boolean, returnValue: jwtTokenType } = await jwtToken.verifyToken(token);
    return res.json(result);
});

//console.log( '__dirname', __dirname );

export = router;