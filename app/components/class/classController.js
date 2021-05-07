import {
    fetchClassList,
    createNewClass,
    getDetailClass,
    updateClass,
    deleteClassById,
} from './classService';

import {
    respondSuccess,
    respondWithError,
    logSystemError,
} from '../../helpers/messageResponse';
import { checkIfValueExist } from '../../helpers/commonFunctions';
import db from '../../models';

export async function getList(req, res) {
    try {
        const rawData = req.query;
        const classes = await fetchClassList(rawData);
        console.log('req.userId', req.userId);
        return res.json(
            respondSuccess({ items: classes.rows, totalItems: classes.count }),
        );
    } catch (error) {
        return logSystemError(res, error, 'classController - getList');
    }
}

export async function createClass(req, res) {
    try {
        const rawData = req.body;
        const isNameExist = await checkIfValueExist(
            db.Class,
            rawData.name,
            'name',
        );
        if (isNameExist) {
            return res.json(respondWithError(407, 'Class exist'));
        }
        const classes = await createNewClass(rawData);
        return res.json(respondSuccess(classes));
    } catch (error) {
        return logSystemError(res, error, 'classController - createClass');
    }
}

export async function getDetail(req, res) {
    try {
        const { id } = req.params;
        const classes = await getDetailClass(id);
        if (!classes) {
            return res.json(respondWithError(407, 'Class not exist'));
        }
        return res.json(respondSuccess(classes));
    } catch (error) {
        return logSystemError(res, error, 'classController - getDetail');
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Class, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Class not exist'));
        }
        const rawData = req.body;
        const isClassExist = await checkIfValueExist(
            db.Class,
            rawData.name,
            'name',
            { excludeField: 'id', excludeValues: [id] },
        );
        if (isClassExist) {
            return res.json(respondWithError(407, 'Class name exist'));
        }
        await updateClass(id, rawData);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'classController - update');
    }
}

export async function deleteClass(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Class, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Class not exist'));
        }
        const isClassHaveStudent = await checkIfValueExist(
            db.Student,
            id,
            'classId',
        );
        if (isClassHaveStudent) {
            return res.json(respondWithError(407, 'Class have students'));
        }
        await deleteClassById(id);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'classController - deleteClass');
    }
}
