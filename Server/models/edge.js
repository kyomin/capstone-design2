module.exports = (sequelize, Sequelize) => {
    return sequelize.define('edge', {
        userId: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        timeStamp: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        hashValue: {
            type: Sequelize.STRING(128),
            allowNull: false
        }
    });
}