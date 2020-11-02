const { Cloud } = require('../models');

//=======================================
//             Read Service
//=======================================

const getFileInfos = (userId) => {
    return new Promise((resolve, reject) => {
        Cloud.findAll({ where: {userId : userId} })
        .then((files) => {
            resolve({
                files,
                getFileInfosSuccess: true
            });
        })
        .catch((err) => {
            reject({
                getFileInfosSuccess: false,
                errorMessage: err
            });
        });
    });
}

module.exports = {
    getFileInfos
};