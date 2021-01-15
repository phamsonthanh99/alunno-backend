import { logger } from '../../helpers/logger';

const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const db = require('../../models');

const { Op } = Sequelize;
export function isValidPassword(userpass, password) {
    return bcrypt.compareSync(userpass, password);
}
export async function findRole(role) {
    try {
        const roles = await db.Role.findAll({
            where: {
                name: {
                    [Op.or]: role,
                },
            },
        });
        return roles;
    } catch (error) {
        logger.error(`Error in findRole ${error.message}`);
        throw error;
    }
}

export async function createUser(data) {
    try {
        const user = await db.User.create({
            fullName: data.fullName,
            phone: data.phone,
            age: data.age,
            address: data.address,
            username: data.username,
            email: data.email,
            password: bcrypt.hashSync(data.password, 8),
        });
        return user;
    } catch (error) {
        logger.error(`Error in createUser ${error.message}`);
        throw error;
    }
}
