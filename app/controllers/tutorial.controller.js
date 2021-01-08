import {
    createNewTutorial, fetchTutorialList, getTutorialDetail, updateTutorial, deleteTutorialById,
} from '../service/tutorial.service';
// const Sequelize = require('sequelize');

// const { Op } = Sequelize;

export async function createTutorial(req, res) {
    try {
        const rawData = req.body;
        if (!rawData.published) {
            rawData.published = false;
        }
        const tutorial = await createNewTutorial(rawData);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function findAllTutorial(req, res) {
    try {
        const rawData = req.query;
        const tutorial = await fetchTutorialList(rawData);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function findOneTutorial(req, res) {
    try {
        const { id } = req.params;
        const tutorial = await getTutorialDetail(id);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const rawData = req.body;
        await updateTutorial(id, rawData);
        const tutorial = await getTutorialDetail(id);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function deleteTutorial(req, res) {
    try {
        const { id } = req.params;
        await deleteTutorialById(id);
        return res.json('success');
    } catch (error) {
        return res.error;
    }
}
