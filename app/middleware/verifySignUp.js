import { respondWithError } from '../helpers/messageResponse';
import { ROLES } from '../models';

const db = require('../models');

export async function checkDuplicateUsernameOrEmail(req, res, next) {
    const fullName = await db.User.findOne({
        where: {
            fullName: req.body.fullName,
        },
    });
    if (fullName) {
        res.json(respondWithError(400, 'Failed, Full Name is already in use'));
        return;
    }
    const username = await db.User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (username) {
        res.json(respondWithError(400, 'Failed, Username is already in use'));
        return;
    }
    const userEmail = await db.User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (userEmail) {
        res.json(respondWithError(400, 'Failed, Email is already in use'));
        return;
    }
    next();
}

export async function checkRolesExisted(req, res, next) {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i += 1) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.json(
                    respondWithError(
                        400,
                        `Failed! Role does not exist = ${req.body.roles[i]}`,
                    ),
                );
                return;
            }
        }
    }
    next();
}
