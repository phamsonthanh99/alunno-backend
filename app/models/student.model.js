module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        studentId: {
            type: Sequelize.STRING,
        },
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
        email: {
            type: Sequelize.STRING,
        },
        gender: {
            type: Sequelize.ENUM('male', 'female', 'other'),
            defaultValue: 'other',
        },
        classId: {
            type: Sequelize.INTEGER,
        },
    });

    return Student;
};
