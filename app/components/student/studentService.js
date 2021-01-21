import { logger } from '../../helpers/logger';

const Sequelize = require('sequelize');
const db = require('../../models');

const { Op } = Sequelize;

export async function fetchStudentList(filter) {
    try {
        const { keyword = '', page = 0, limit = 10 } = filter;
        const offset = +limit * +page;
        const query = {
            offset,
            limit: +limit,
        };
        const studentWhere = {
            [Op.or]: {
                studentId: {
                    [Op.like]: `%${keyword}%`,
                },
                fullName: {
                    [Op.like]: `%${keyword}%`,
                },
                phone: {
                    [Op.like]: `%${keyword}%`,
                },
                address: {
                    [Op.like]: `%${keyword}%`,
                },
                email: {
                    [Op.like]: `%${keyword}%`,
                },
            },
        };
        query.where = studentWhere;
        const rawData = await db.Student.findAndCountAll(query);
        return rawData;
    } catch (error) {
        logger.error(`Error in fetchStudentList ${error.message}`);
        throw error;
    }
}

export async function createNewStudent(student) {
    try {
        const rawData = await db.Student.create(student);
        return rawData;
    } catch (error) {
        logger.error(`Error in createNewStudent ${error.message}`);
        throw error;
    }
}

export async function getStudentDetail(id) {
    try {
        const studentDetail = await db.Student.findByPk(id);
        return studentDetail;
    } catch (error) {
        logger.error(`Error in getStudentDetail ${error.message}`);
        throw error;
    }
}

export async function updateStudent(id, student) {
    try {
        await db.Student.update(student, {
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in updateStudent ${error.message}`);
        throw error;
    }
}

export async function deleteStudentById(id) {
    try {
        await db.Student.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in deleteStudent ${error.message}`);
        throw error;
    }
}
