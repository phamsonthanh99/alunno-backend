import {
    fetchStudentList,
    getStudentDetail,
    createNewStudent,
    updateStudent,
    deleteStudentById,
} from './studentService';

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
        const student = await fetchStudentList(rawData);
        return res.json(
            respondSuccess({ items: student.rows, totalItems: student.count }),
        );
    } catch (error) {
        return logSystemError(res, error, 'studentController - getList');
    }
}

export async function createStudent(req, res) {
    try {
        const rawData = req.body;
        const isStudentExist = await checkIfValueExist(
            db.Student,
            rawData.studentId,
            'studentId',
        );
        if (isStudentExist) {
            return res.json(respondWithError(407, 'Student exist'));
        }
        const student = await createNewStudent(rawData);
        return res.json(respondSuccess(student));
    } catch (error) {
        return logSystemError(res, error, 'studentController - createStudent');
    }
}

export async function getDetail(req, res) {
    try {
        const { id } = req.params;
        const student = await getStudentDetail(id);
        if (!student) {
            return res.json(respondWithError(407, 'Student not exist'));
        }
        return res.json(respondSuccess(student));
    } catch (error) {
        return logSystemError(res, error, 'studentController - getDetail');
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Student, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Student not exist'));
        }
        const rawData = req.body;
        await updateStudent(id, rawData);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'studentController - update');
    }
}

export async function deleteStudent(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.Student, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'Student not exist'));
        }
        await deleteStudentById(id);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'studentController - deleteStudent');
    }
}
