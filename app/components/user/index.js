import {
    getList,
    create,
    getDetail,
    update,
    deleteUser,
} from './userController';
import {
    createValidator,
    updateValidator,
    getListValidator,
} from './userValidator';
import { verifyToken, isAdmin } from '../../middleware/authJwt';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept',
        );
        next();
    });
    router.get('/', verifyToken, getListValidator, getList);

    router.post('/', verifyToken, createValidator, create);

    router.get('/:id', verifyToken, getDetail);

    router.patch('/:id', verifyToken, updateValidator, update);

    router.delete('/:id', verifyToken, isAdmin, deleteUser);
    app.use('/api/user', router);
};
