module.exports = (sequelize, Sequelize) => {
    return sequelize.define('cloud', {
        userId: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        timeStamp: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        hashValue: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fileType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fileSize: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fileContents: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });
}