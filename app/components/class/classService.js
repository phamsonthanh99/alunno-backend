import { logger } from '../../helpers/logger';

const Sequelize = require('sequelize');
const db = require('../../models');

const { Op } = Sequelize;

export async function fetchClassList(filter) {
    try {
        const { keyword = '', page = 0, limit = 10 } = filter;
        const offset = +limit * +page;
        const query = {
            offset,
            limit: +limit,
        };
        const classWhere = {
            [Op.or]: {
                name: {
                    [Op.like]: `%${keyword}%`,
                },
                description: {
                    [Op.like]: `%${keyword}%`,
                },
            },
        };
        query.where = classWhere;
        const rawData = await db.Class.findAndCountAll(query);
        return rawData;
    } catch (error) {
        logger.error(`Error in fetchClassList ${error.message}`);
        throw error;
    }
}

export async function createNewClass(newClass) {
    try {
        const rawData = await db.Class.create(newClass);
        return rawData;
    } catch (error) {
        logger.error(`Error in createNewClass ${error.message}`);
        throw error;
    }
}

export async function getDetailClass(id) {
    try {
        const classDetail = await db.Class.findByPk(id);
        return classDetail;
    } catch (error) {
        logger.error(`Error in getDetailClass ${error.message}`);
        throw error;
    }
}

export async function updateClass(id, classDetail) {
    try {
        await db.Class.update(classDetail, {
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in updateClass ${error.message}`);
        throw error;
    }
}

export async function deleteClassById(id) {
    try {
        await db.Class.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in deleteClass ${error.message}`);
        throw error;
    }
}
