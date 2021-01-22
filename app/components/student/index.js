import {
    getList,
    getDetail,
    createStudent,
    update,
    deleteStudent,
} from './studentController';
import {
    getListValidator,
    createValidator,
    updateValidator,
} from './studentValidator';
import { verifyToken, isSchoolManagerOrAdmin } from '../../middleware/authJwt';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', verifyToken, getListValidator, getList);

    router.post('/', verifyToken, isSchoolManagerOrAdmin, createValidator, createStudent);

    router.get('/:id', verifyToken, getDetail);

    router.patch('/:id', verifyToken, isSchoolManagerOrAdmin, updateValidator, update);

    router.delete('/:id', verifyToken, isSchoolManagerOrAdmin, deleteStudent);

    app.use('/api/student', router);
};
