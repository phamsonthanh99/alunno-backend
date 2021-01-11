const tutorialApiRouter = require('./tutorial.routes');
const userApiRouter = require('./user.routes');

const routerManager = (app) => {
    tutorialApiRouter(app);
    userApiRouter(app);
};

module.exports = routerManager;
