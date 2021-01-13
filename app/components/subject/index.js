import {
    getList,
    getDetail,
    createSubject,
    update,
    deleteSubject,
} from './subjectController';

import {
    getListValidator,
    createValidator,
    updateValidator,
} from './subjectValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', getListValidator, getList);

    router.post('/', createValidator, createSubject);

    router.get('/:id', getDetail);

    router.patch('/:id', updateValidator, update);

    router.delete('/:id', deleteSubject);

    app.use('/api/subject', router);
};
