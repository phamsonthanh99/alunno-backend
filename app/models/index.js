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
db.Class = require('./class.model')(sequelize, Sequelize);
db.Subject = require('./subject.model')(sequelize, Sequelize);
db.Student = require('./student.model')(sequelize, Sequelize);

// Role and User (Many-To-Many)
db.Role.belongsToMany(db.User, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId',
});
db.User.belongsToMany(db.Role, {
    as: 'roles',
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});
db.ROLES = ['teacher', 'admin', 'school_manager'];

// Student and Class (One-To-Many)
db.Student.belongsTo(db.Class, {
    as: 'class',
    foreignKey: 'classId',
    targetKey: 'id',
});
db.Class.hasMany(db.Student, {
    as: 'student',
    foreignKey: 'classId',
    sourceKey: 'id',
});

// Subject and User (One-To-Many)
db.Subject.belongsTo(db.User, {
    as: 'teacher',
    foreignKey: 'userId',
    targetKey: 'id',
});
db.User.hasMany(db.Subject, {
    as: 'subject',
    foreignKey: 'userId',
    sourceKey: 'id',
});
module.exports = db;
