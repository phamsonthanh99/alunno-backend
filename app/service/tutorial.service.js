const Sequelize = require('sequelize');
const db = require('../models');

const { Op } = Sequelize;
export async function createNewTutorial(tutorial) {
    try {
        const newTutorial = await db.tutorials.create(tutorial);
        return newTutorial;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
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
        const rawData = await db.tutorials.findAndCountAll(query);
        return rawData;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function getTutorialDetail(id) {
    try {
        const tutorial = await db.tutorials.findByPk(id);
        return tutorial;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function updateTutorial(id, tutorialDetail) {
    try {
        await db.tutorials.update(tutorialDetail, {
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export async function deleteTutorialById(id) {
    try {
        await db.tutorials.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
