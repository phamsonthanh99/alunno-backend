import {
    createTutorial,
    findAllTutorial,
    findOneTutorial,
    updateTutorial,
    deleteTutorial,
} from '../controllers/tutorial.controller';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.post('/', createTutorial);

    router.get('/', findAllTutorial);

    router.get('/:id', findOneTutorial);

    router.patch('/:id', updateTutorial);

    router.delete('/:id', deleteTutorial);
    app.use('/api/tutorial', router);
};
