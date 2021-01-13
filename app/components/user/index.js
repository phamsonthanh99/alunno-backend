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

    router.get('/', getListValidator, getList);

    router.post('/', createValidator, create);

    router.get('/:id', getDetail);

    router.patch('/:id', updateValidator, update);

    router.delete('/:id', verifyToken, isAdmin, deleteUser);
    app.use('/api/user', router);
};
