module.exports = (sequelize, Sequelize) => {
    const ExamScore = sequelize.define('examScore', {
        studentId: {
            type: Sequelize.INTEGER,
        },
        subjectId: {
            type: Sequelize.INTEGER,
        },
        scoreMulOne: {
            type: Sequelize.INTEGER,
        },
        scoreMulTwo: {
            type: Sequelize.INTEGER,
        },
        scoreMulThree: {
            type: Sequelize.INTEGER,
        },
    });

    return ExamScore;
};
