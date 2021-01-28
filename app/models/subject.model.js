module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define('subject', {
        name: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM('inactive', 'active', 'done'),
            defaultValue: 'inactive',
        },
        description: {
            type: Sequelize.STRING,
        },
    });

    return Subject;
};
