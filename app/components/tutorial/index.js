import {
    createTutorial,
    findAllTutorial,
    findOneTutorial,
    update,
    deleteTutorial,
} from './tutorialController';

import {
    createValidator,
    updateValidator,
    getListValidator,
} from './tutorialValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.post('/', createValidator, createTutorial);

    router.get('/', getListValidator, findAllTutorial);

    router.get('/:id', findOneTutorial);

    router.patch('/:id', updateValidator, update);

    router.delete('/:id', deleteTutorial);
    app.use('/api/tutorial', router);
};
