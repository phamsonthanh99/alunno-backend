const tutorialApiRouter = require('../components/tutorial');
const userApiRouter = require('../components/user');

const routerManager = (app) => {
    tutorialApiRouter(app);
    userApiRouter(app);
};

module.exports = routerManager;
