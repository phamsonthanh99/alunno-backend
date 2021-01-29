import {
    fetchSubjectList,
    getDetailSubject,
    createNewSubject,
    updateSubject,
    deleteSubjectById,
} from './subjectService';

import {
    respondSuccess,
    respondWithError,
    logSystemError,
} from '../../helpers/messageResponse';
import { SubjectStatus } from './subjectConstance';
import { checkIfValueExist } from '../../helpers/commonFunctions';
import db from '../../models';

export async function getList(req, res) {
    try {
        const rawData = req.query;
        const subject = await fetchSubjectList(rawData);
        return res.json(
            respondSuccess({ items: subject.rows, totalItems: subject.count }),
        );
    } catch (error) {
        return logSystemError(res, error, 'subjectController - getList');
    }
}

export async function createSubject(req, res) {
    try {
        const rawData = req.body;
        const isNameExist = await checkIfValueExist(
            db.Subject,
            rawData.name,
            'name',
        );
        if (isNameExist) {
            return res.json(respondWithError(407, 'Subject exist'));
        }
        const subject = await createNewSubject(rawData);
        return res.json(respondSuccess(subject));
    } catch (error) {
        return logSystemError(res, error, 'subjectController - createSubject');
    }
}

export async function getDetail(req, res) {
    try {
        const { id } = req.params;
        const subject = await getDetailSubject(id);
        if (!subject) {
            return res.json(respondWithError(407, 'Subject not exist'));
        }
        return res.json(respondSuccess(subject));
    } catch (error) {
        return logSystemError(res, error, 'subjectController - getDetail');
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Subject, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Subject not exist'));
        }
        const rawData = req.body;
        const isSubjectExist = await checkIfValueExist(
            db.Subject,
            rawData.name,
            'name',
            { excludeField: 'id', excludeValues: [id] },
        );
        if (isSubjectExist) {
            return res.json(respondWithError(407, 'Subject name exist'));
        }
        await updateSubject(id, rawData);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'subjectController - update');
    }
}

export async function deleteSubject(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Subject, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Subject not exist'));
        }
        const subject = await db.Subject.findByPk(id);
        if (subject.status === SubjectStatus.ACTIVE) {
            return res.json(
                respondWithError(406, 'do not delete subject when active'),
            );
        }
        await deleteSubjectById(id);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'subjectController - deleteSubject');
    }
}
