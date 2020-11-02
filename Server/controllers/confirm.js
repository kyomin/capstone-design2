const confirmService = require("../services/confirm");

//=======================================
//             Confirm Controller
//=======================================

const confirmFileIntegrity = (req, res) => {
    confirmService.confirmFileIntegrity(req.body.userId, req.body.timeStamp)
    .then((success) => {
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

module.exports = {
    confirmFileIntegrity
};