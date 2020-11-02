const storeService = require("../services/store");

//=======================================
//             Store Controller
//=======================================

const storeFile = (req, res) => {
    storeService.storeFile(req)
    .then((success) => {
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

module.exports = {
    storeFile
};