// const Sequelize = require('sequelize');
const db = require('../models');

// const { Op } = Sequelize;

export async function createTutorial(req, res) {
    try {
        const rawData = req.body;
        if (!rawData.published) {
            rawData.published = false;
        }
        const tutorial = await db.tutorials.create(rawData);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function findAllTutorial(req, res) {
    try {
        const rawData = req.query;
        const tutorial = await db.tutorials.findAll({ where: rawData });
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function findOneTutorial(req, res) {
    try {
        const { id } = req.params;
        const tutorial = await db.tutorials.findByPk(id);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function updateTutorial(req, res) {
    try {
        const { id } = req.params;
        const rawData = req.body;
        await db.tutorials.update(rawData, {
            where: {
                id,
            },
        });
        const tutorial = await db.tutorials.findByPk(id);
        return res.json(tutorial);
    } catch (error) {
        return res.error;
    }
}

export async function deleteTutorial(req, res) {
    try {
        const { id } = req.params;
        const tutorial = await db.tutorials.destroy({
            where: {
                id,
            },
        });
        if (tutorial === 1) {
            return res.json('Tutorial was deleted successfully!');
        }
        return res.json(
            `Cannot delete Tutorial with id = ${id}. Maybe Tutorial was not found!`,
        );
    } catch (error) {
        return res.error;
    }
}
