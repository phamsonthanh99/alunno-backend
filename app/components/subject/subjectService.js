import { logger } from '../../helpers/logger';

const Sequelize = require('sequelize');
const db = require('../../models');

const { Op } = Sequelize;

const subjectAttributes = ['id', 'name', 'status', 'description'];
const subjectInclude = [
    {
        model: db.User,
        as: 'teacher',
        attributes: ['id', 'fullName'],
        include: {
            model: db.Role,
            as: 'roles',
            attributes: ['name'],
            required: false,
            through: {
                attributes: [],
            },
        },
    },
];
export async function fetchSubjectList(filter) {
    try {
        const { keyword = '', page = 0, limit = 10 } = filter;
        const offset = +limit * +page;
        const query = {
            attributes: subjectAttributes,
            offset,
            limit: +limit,
            include: subjectInclude,
        };
        const subjectWhere = {
            [Op.or]: {
                name: {
                    [Op.like]: `%${keyword}%`,
                },
                status: {
                    [Op.like]: `%${keyword}%`,
                },
                description: {
                    [Op.like]: `%${keyword}%`,
                },
            },
        };
        query.where = subjectWhere;
        const rawData = await db.Subject.findAndCountAll(query);
        return rawData;
    } catch (error) {
        logger.error(`Error in fetchSubjectList ${error.message}`);
        throw error;
    }
}

export async function createNewSubject(subject) {
    try {
        const rawData = await db.Subject.create(subject);
        return rawData;
    } catch (error) {
        logger.error(`Error in createNewSubject ${error.message}`);
        throw error;
    }
}

export async function getDetailSubject(id) {
    try {
        const subjectDetail = await db.Subject.findByPk(id, {
            attributes: subjectAttributes,
            include: subjectInclude,
        });
        return subjectDetail;
    } catch (error) {
        logger.error(`Error in getDetailSubject ${error.message}`);
        throw error;
    }
}

export async function updateSubject(id, subject) {
    try {
        await db.Subject.update(subject, {
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in updateSubject ${error.message}`);
        throw error;
    }
}

export async function deleteSubjectById(id) {
    try {
        await db.Subject.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in deleteSubjectById ${error.message}`);
        throw error;
    }
}
