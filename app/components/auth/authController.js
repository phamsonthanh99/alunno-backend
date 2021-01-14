import { checkIfValueExist } from '../../helpers/commonFunctions';
import {
    respondSuccess,
    respondWithError,
    logSystemError,
} from '../../helpers/messageResponse';

const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config/auth.config');

const db = require('../../models');

const { Op } = Sequelize;
export async function signup(req, res) {
    try {
        const user = await db.User.create({
            fullName: req.body.fullName,
            phone: req.body.phone,
            age: req.body.age,
            address: req.body.address,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        if (req.body.roles) {
            const roles = await db.Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });
            await user.setRoles(roles);
            return res.json(respondSuccess(200, 'User registered successfully!'));
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
            return res.json(respondWithError(407, 'User not exist'));
        }
        const passwordIsValid = bcrypt.compareSync(
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
        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i += 1) {
            authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
        }
        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (error) {
        return logSystemError(res, error, 'authController - signin');
    }
}
