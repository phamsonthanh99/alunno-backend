module.exports = (sequelize, Sequelize) => {
    const Permission = sequelize.define('permission', {
        role: {
            type: Sequelize.STRING,
        },
        permission: {
            type: Sequelize.STRING,
        },
    });

    return Permission;
};
