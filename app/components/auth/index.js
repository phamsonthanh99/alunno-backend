import { signin, signup } from './authController';
import {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
} from '../../middleware/verifySignUp';

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

    router.post('/signup', checkDuplicateUsernameOrEmail, checkRolesExisted, signup);

    router.post('/signin', signin);

    app.use('/api/auth', router);
};