import { logger } from '../../helpers/logger';

const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('../../models');

const { Op } = Sequelize;

const userAttributes = ['id', 'fullName', 'phone', 'age', 'address', 'username', 'email'];
const userInclude = [
    {
        model: db.Role,
        as: 'roles',
        attributes: ['id', 'name'],
        required: false,
        through: {
            attributes: [],
        },
    },
];
export async function fetchUserList(filter) {
    try {
        const { keyword = '', page = 0, limit = 10 } = filter;
        const offset = +limit * +page;
        const query = {
            attributes: userAttributes,
            offset,
            limit: +limit,
            include: userInclude,
        };
        const userWhere = {
            [Op.or]: {
                username: {
                    [Op.like]: `%${keyword}%`,
                },
                email: {
                    [Op.like]: `%${keyword}%`,
                },
            },
        };
        query.where = userWhere;
        const rawData = await db.User.findAndCountAll(query);
        return rawData;
    } catch (error) {
        logger.error(`Error in createNewTutorial ${error.message}`);
        throw error;
    }
}

export async function createUser(user) {
    try {
        const newUser = await db.User.create({
            username: user.username,
            email: user.email,
            password: bcrypt.hashSync(user.password, 8),
        });
        return newUser;
    } catch (error) {
        logger.error(`Error in createUser ${error.message}`);
        throw error;
    }
}

export async function getUserDetail(id) {
    try {
        const user = await db.User.findByPk(id, {
            attributes: userAttributes,
        });
        return user;
    } catch (error) {
        logger.error(`Error in getUserDetail ${error.message}`);
        throw error;
    }
}

export async function updateUser(id, user) {
    try {
        await db.User.update(user, {
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in updateUser ${error.message}`);
        throw error;
    }
}

export async function deleteUserById(id) {
    try {
        await db.User.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in deleteUser ${error.message}`);
        throw error;
    }
}
