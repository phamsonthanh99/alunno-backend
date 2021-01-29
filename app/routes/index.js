const tutorialApiRouter = require('../components/tutorial');
const userApiRouter = require('../components/user');
const classApiRouter = require('../components/class');
const subjectApiRouter = require('../components/subject');
const authApiRouter = require('../components/auth');
const studentApiRouter = require('../components/student');

const routerManager = (app) => {
    tutorialApiRouter(app);
    userApiRouter(app);
    classApiRouter(app);
    subjectApiRouter(app);
    authApiRouter(app);
    studentApiRouter(app);
};

module.exports = routerManager;
