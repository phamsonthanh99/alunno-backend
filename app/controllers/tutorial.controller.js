const Sequelize = require('sequelize');
const db = require('../models');

const { Op } = Sequelize;

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
