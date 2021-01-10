const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Tutorial = require('./tutorial.model.js')(sequelize, Sequelize);
db.User = require('./user.model')(sequelize, Sequelize);
db.Role = require('./role.model')(sequelize, Sequelize);

db.Role.belongsToMany(db.User, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId',
});
db.User.belongsToMany(db.Role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});

db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
