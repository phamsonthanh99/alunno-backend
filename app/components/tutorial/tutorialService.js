import { logger } from '../../helpers/logger';

const Sequelize = require('sequelize');
const db = require('../../models');

const { Op } = Sequelize;
export async function createNewTutorial(tutorial) {
    try {
        const newTutorial = await db.Tutorial.create(tutorial);
        return newTutorial;
    } catch (error) {
        logger.error(`Error in createNewTutorial ${error.message}`);
        throw error;
    }
}

export async function fetchTutorialList(filter) {
    try {
        const { keyword = '', page = 0, limit = 10 } = filter;
        const offset = +limit * +page;
        const query = {
            offset,
            limit: +limit,
        };
        const tutorialWhere = {
            [Op.or]: {
                title: {
                    [Op.like]: `%${keyword}%`,
                },
                description: {
                    [Op.like]: `%${keyword}%`,
                },
            },
        };
        query.where = tutorialWhere;
        const rawData = await db.Tutorial.findAll(query);
        return rawData;
    } catch (error) {
        logger.error(`Error in fetchTutorialList ${error.message}`);
        throw error;
    }
}

export async function getTutorialDetail(id) {
    try {
        const tutorial = await db.Tutorial.findByPk(id);
        return tutorial;
    } catch (error) {
        logger.error(`Error in getTutorialDetail ${error.message}`);
        throw error;
    }
}

export async function updateTutorial(id, tutorialDetail) {
    try {
        await db.Tutorial.update(tutorialDetail, {
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in updateTutorial ${error.message}`);
        throw error;
    }
}

export async function deleteTutorialById(id) {
    try {
        await db.Tutorial.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in deleteTutorialById ${error.message}`);
        throw error;
    }
}
