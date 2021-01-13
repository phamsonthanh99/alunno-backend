const tutorialApiRouter = require('../components/tutorial');
const userApiRouter = require('../components/user');
const classApiRouter = require('../components/class');

const routerManager = (app) => {
    tutorialApiRouter(app);
    userApiRouter(app);
    classApiRouter(app);
};

module.exports = routerManager;
