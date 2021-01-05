import { createTutorial } from '../controllers/tutorial.controller';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.post('/', createTutorial);

    app.use('/api/tutorial', router);
};
