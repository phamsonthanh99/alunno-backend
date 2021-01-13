import { respondSuccess, respondWithError } from '../helpers/messageResponse';

const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');

export async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.json(respondSuccess(403, 'No token provided'));
        return;
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.json(respondWithError(401, 'Unauthorized'));
            return;
        }
        req.userId = decoded.id;
        next();
    });
}

export async function isAdmin(req, res, next) {
    const user = await db.User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i += 1) {
        if (roles[i].name === 'admin') {
            next();
            return;
        }
    }
    res.json(respondWithError(403, 'Require Admin Role'));
    // eslint-disable-next-line no-useless-return
    return;
}
