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
import { verifyToken, isAdmin } from '../../middleware/authJwt';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', verifyToken, getListValidator, getList);

    router.post('/', verifyToken, createValidator, createClass);

    router.get('/:id', verifyToken, getDetail);

    router.patch('/:id', verifyToken, updateValidator, update);

    router.delete('/:id', verifyToken, deleteClass);

    app.use('/api/class', router);
};
