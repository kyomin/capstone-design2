const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Cloud, Edge } = require('../models');

//=======================================
//             Store Service
//=======================================

const hashIngredients = (ingredients) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) reject(err);
    
            bcrypt.hash(ingredients, salt, function(err, hash) {
                if(err) reject(err);
                
                resolve(hash);
            });
        });
    });
}

const storeFile = (req) => {
    return new Promise((resolve, reject) => {
        const ingredients = req.body.userId + req.body.timeStamp + req.body.fileName + req.body.fileType + req.body.fileSize + req.body.fileContents;

        hashIngredients(ingredients)
        .then((hashedIngreditents) => {
            req.body.hashValue = hashedIngreditents;
            console.log("req.body : ", req.body);
            Cloud.create(req.body)
            .then(async () => {
                /* 
                    클라우드 서버에 저장이 완료되면 
                    엣지 서버에 일부 데이터를 저장한다.
                */
                const edgeData = {
                    userId: req.body.userId,
                    timeStamp: req.body.timeStamp,
                    hashValue: req.body.hashValue
                };
                console.log("클라우드 저장 성공");
                console.log("edge data : ", edgeData);
                return Edge.create(edgeData)
                .then(() => {
                    console.log("엣지 저장 성공");
                    return resolve({ storeCloudSuccess: true });  
                })
                .catch((err) => {
                    return reject({ 
                        storeCloudSuccess: false, 
                        errorMessage: err 
                    });
                });
            })
            .catch((err) => {
                return reject({ 
                    storeCloudSuccess: false, 
                    errorMessage: err 
                });
            });
        });
    });
}

module.exports = {
    storeFile
};