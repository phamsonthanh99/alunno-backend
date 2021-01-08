const db = require('../models');

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

export async function fetchTutorialList(query) {
    try {
        const rawData = await db.tutorials.findAll({ where: query });
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
