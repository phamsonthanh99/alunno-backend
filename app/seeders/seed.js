import { initial } from './seeder';

const db = require('../models');

db.sequelize.sync({ force: true }).then(() => {
    // eslint-disable-next-line no-console
    console.log('Drop and re-sync db.');
    initial();
});
