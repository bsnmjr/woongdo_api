import express, { Request, Response, NextFunction } from 'express';

import { jwtTokenType } from '../../types/';
import { jwtToken } from '../../token';
import { sql } from '../../dbHandle';
import { cryptoHandle } from '../../cryptoHandle';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.delete('/', async (req: Request, res: Response) => {
    const userToken: string | null = req.headers.authorization as string ?? null;

    if (!userToken) {
        return res.json({
            isError: true,
            message: '토큰이 비어있습니다.',
        });
    }

    const { calendarID }: { calendarID: string } = Object.assign(req.body, req.query);

    if (!calendarID) {
        return res.json({
            isError: true,
            message: '입력하지 않은 값들이 있습니다.',
        });
    }

    const { isError, returnValue }: { isError: boolean, returnValue: jwtTokenType } = await jwtToken.verifyToken(userToken);

    if (isError || returnValue.type !== 'A') {
        return res.json({
            isError: true,
            message: '데이터 접근 권한이 없습니다.',
        });
    }

    try {
        const query1: any = await sql(`SELECT * FROM ${process.env.MYSQL_DB}.calendar WHERE calendarID=?`, [calendarID]);
        if (Array.isArray(query1) && query1.length === 0)
            return res.json({
                isError: true,
                message: '일정이 존재하지 않습니다.',
            });
        const query2: any = await sql(`DELETE FROM ${process.env.MYSQL_DB}.calendar WHERE calendarID=? AND userID=?`, [calendarID, cryptoHandle.AES_DEC(returnValue.id)]);
        if (query2?.affectedRows == 0) {
            return res.json({
                isError: true,
                message: '다른 사람이 등록한 일정은 삭제할 수 없습니다.'
            });
        }
        return res.json({
            isError: false,
            message: '성공적으로 일정을 삭제했습니다'
        });
    }
    catch (err) {
        return res.json({
            isError: true,
            message: err
        })
    }
});

export = router;
