module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        fullName: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
    });

    return User;
};
