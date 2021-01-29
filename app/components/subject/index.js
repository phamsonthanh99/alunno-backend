import {
    getList,
    getDetail,
    createSubject,
    update,
    deleteSubject,
} from './subjectController';

import {
    getListValidator,
    createValidator,
    updateValidator,
} from './subjectValidator';
import { verifyToken, isSchoolManagerOrAdmin } from '../../middleware/authJwt';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', verifyToken, getListValidator, getList);

    router.post('/', verifyToken, isSchoolManagerOrAdmin, createValidator, createSubject);

    router.get('/:id', verifyToken, getDetail);

    router.patch('/:id', verifyToken, isSchoolManagerOrAdmin, updateValidator, update);

    router.delete('/:id', verifyToken, isSchoolManagerOrAdmin, deleteSubject);

    app.use('/api/subject', router);
};
