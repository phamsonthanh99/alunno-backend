const tutorialApiRouter = require('../components/tutorial');
const userApiRouter = require('../components/user');
const classApiRouter = require('../components/class');
const subjectApiRouter = require('../components/subject');

const routerManager = (app) => {
    tutorialApiRouter(app);
    userApiRouter(app);
    classApiRouter(app);
    subjectApiRouter(app);
};

module.exports = routerManager;
