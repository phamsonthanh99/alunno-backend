import { changePassword, signin, signup } from './authController';
import {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
} from '../../middleware/verifySignUp';
import { verifyToken, isAdmin } from '../../middleware/authJwt';
import { createUserValidator, signinValidator, changePasswordValidator } from './authValidator';

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

    router.post(
        '/signup',
        verifyToken,
        isAdmin,
        checkDuplicateUsernameOrEmail,
        checkRolesExisted,
        createUserValidator,
        signup,
    );

    router.post('/signin', signinValidator, signin);

    router.post('/change-password/:id', verifyToken, changePasswordValidator, changePassword);
    app.use('/api/auth', router);
};
