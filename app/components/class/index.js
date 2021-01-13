import {
    getList,
    getDetail,
    createClass,
    deleteClass,
    update,
} from './classController';

import {
    createValidator,
    getListValidator,
    updateValidator,
} from './classValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', getListValidator, getList);

    router.post('/', createValidator, createClass);

    router.get('/:id', getDetail);

    router.patch('/:id', updateValidator, update);

    router.delete('/:id', deleteClass);

    app.use('/api/class', router);
};
