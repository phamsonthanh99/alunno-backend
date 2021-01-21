import {
    getList,
    getDetail,
    createStudent,
    update,
    deleteStudent,
} from './studentController';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', getList);

    router.post('/', createStudent);

    router.get('/:id', getDetail);

    router.patch('/:id', update);

    router.delete('/:id', deleteStudent);

    app.use('/api/student', router);
};
