const readService = require("../services/read");

//=======================================
//             Read Controller
//=======================================

const getFileInfos = (req, res) => {
    readService.getFileInfos(req.params.userId)
    .then((success) => {
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

module.exports = {
    getFileInfos
};