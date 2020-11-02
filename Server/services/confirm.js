const bcrypt = require('bcrypt');

const { Cloud, Edge } = require('../models');

//=======================================
//             Confirm Service
//=======================================

const confirmFileIntegrity = (userId, timeStamp) => {
    return new Promise((resolve, reject) => {
        Cloud.findAll({ where: {userId: userId, timeStamp: timeStamp }})
        .then((result) => {
            const file = result[0].dataValues;
            const ingredients = file.userId + file.timeStamp + file.fileName + file.fileType + file.fileSize + file.fileContents;
            
            Edge.findAll({ where: {userId: userId, timeStamp: timeStamp }})
            .then((result) => {
                const edgeData = result[0].dataValues;
                const hashValue = edgeData.hashValue;

                bcrypt.compare(ingredients, hashValue, function(err, result) {
                    if(err) {
                        reject({
                            confirmFileIntegritySuccess: false,
                            message: "서버 문제로 지금은 파일 무결성 검증을 할 수 없습니다."
                        });
                    }

                    if(!result) {
                        reject({
                            confirmFileIntegritySuccess: false,
                            message: "원본 파일이 변조 되었습니다!"
                        });
                    }

                    resolve({
                        confirmFileIntegritySuccess: true,
                        message: "원본 파일이 변조 되지 않았습니다!"
                    });
                });
            });
        });
    });
}

module.exports = {
    confirmFileIntegrity
};