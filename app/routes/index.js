const tutorialApiRouter = require('./tutorial.routes');

const routerManager = (app) => {
    tutorialApiRouter(app);
};

module.exports = routerManager;
