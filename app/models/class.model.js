module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define('class', {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    });

    return Class;
};
