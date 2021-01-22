import {
    getList,
    getDetail,
    createClass,
    deleteClass,
    update,
} from './classController';

import {
    createValidator,
    getListValidator,
    updateValidator,
} from './classValidator';
import { verifyToken, isSchoolManagerOrAdmin } from '../../middleware/authJwt';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', verifyToken, getListValidator, getList);

    router.post('/', verifyToken, isSchoolManagerOrAdmin, createValidator, createClass);

    router.get('/:id', verifyToken, getDetail);

    router.patch('/:id', verifyToken, isSchoolManagerOrAdmin, updateValidator, update);

    router.delete('/:id', verifyToken, isSchoolManagerOrAdmin, deleteClass);

    app.use('/api/class', router);
};
