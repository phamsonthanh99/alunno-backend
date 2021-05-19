import { checkIfValueExist } from '../../helpers/commonFunctions';
import {
    respondSuccess,
    respondWithError,
    logSystemError,
} from '../../helpers/messageResponse';
import {
    isValidPassword,
    findRole,
    createUser,
    hashPassword,
} from './authService';

const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');

const db = require('../../models');

export async function signup(req, res) {
    try {
        const rawData = req.body;
        const user = await createUser(rawData);

        const role = req.body.roles;
        if (role) {
            const roles = await findRole(role);
            await user.setRoles(roles);
            return res.json(
                respondSuccess(200, 'User registered successfully!'),
            );
        }
        return res.json(respondSuccess());
    } catch (error) {
        return logSystemError(res, error, 'authController - signup');
    }
}

export async function signin(req, res) {
    try {
        const userInfor = req.body;
        const user = await db.User.findOne({
            where: {
                username: userInfor.username,
            },
        });
        const isUserExist = await checkIfValueExist(
            db.User,
            userInfor.username,
            'username',
        );
        if (!isUserExist) {
            return res.json(respondWithError(407, 'username invalid !'));
        }
        const passwordIsValid = isValidPassword(
            userInfor.password,
            user.password,
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!',
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 300,
        });

        const roles = await user.getRoles();

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: roles[0].name,
            accessToken: token,
        });
    } catch (error) {
        return logSystemError(res, error, 'authController - signin');
    }
}

export async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;
        const currenUser = await db.User.findByPk(req.userId);
        if (!isValidPassword(oldPassword, currenUser.password)) {
            return res.json(
                respondWithError(405, 'Old password is not correct', {}),
            );
        }
        await db.User.update(
            {
                password: hashPassword(newPassword),
            },
            {
                where: {
                    id: req.userId,
                },
            },
        );
        return res.json(respondSuccess());
    } catch (error) {
        return logSystemError(res, error, 'authController - changePassword');
    }
}
