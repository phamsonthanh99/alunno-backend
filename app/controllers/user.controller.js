import {
    fetchUserList,
    createUser,
    getUserDetail,
    updateUser,
    deleteUserById,
} from '../service/user.service';
import {
    respondSuccess,
    respondWithError,
    logSystemError,
} from '../helpers/messageResponse';
import { checkIfValueExist } from '../helpers/commonFunctions';
import db from '../models';

export async function getList(req, res) {
    try {
        const rawData = req.query;
        const user = await fetchUserList(rawData);
        return res.json(
            respondSuccess({
                items: user.rows,
                totalItems: user.count,
            }),
        );
    } catch (error) {
        return logSystemError(res, error, 'userController - getList');
    }
}

export async function create(req, res) {
    try {
        const rawData = req.body;
        const isUsernameExist = await checkIfValueExist(
            db.User,
            rawData.username,
            'username',
            {},
        );
        if (isUsernameExist) {
            return res.json(respondWithError(407, 'Username exist'));
        }
        const isEmailExist = await checkIfValueExist(
            db.User,
            rawData.email,
            'email',
            {},
        );
        if (isEmailExist) {
            return res.json(respondWithError(407, 'Email exist'));
        }
        const user = await createUser(rawData);
        return res.json(respondSuccess(user));
    } catch (error) {
        return logSystemError(res, error, 'userController - create');
    }
}

export async function getDetail(req, res) {
    try {
        const { id } = req.params;
        const user = await getUserDetail(id);
        if (!user) {
            return res.json(respondWithError(404, 'User not found'));
        }
        return res.json(respondSuccess(user));
    } catch (error) {
        return logSystemError(res, error, 'userController - getDetail');
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.User, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'User does not exits'));
        }
        const rawData = req.body;
        const isUsernameExist = await checkIfValueExist(
            db.User,
            rawData.username,
            'username',
            { excludeField: 'id', excludeValues: [id] },
        );
        if (isUsernameExist) {
            return res.json(respondWithError(407, 'Username exist'));
        }
        const isEmailExist = await checkIfValueExist(
            db.User,
            rawData.email,
            'email',
            { excludeField: 'id', excludeValues: [id] },
        );
        if (isEmailExist) {
            return res.json(respondWithError(407, 'Email exist'));
        }
        await updateUser(id, rawData);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'getDevtail - update');
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const isIdExist = await checkIfValueExist(db.User, id);
        if (!isIdExist) {
            return res.json(respondWithError(407, 'User does not exist'));
        }
        await deleteUserById(id);
        return res.json(respondSuccess(id));
    } catch (error) {
        return logSystemError(res, error, 'getDevtail - deleteUser');
    }
}
