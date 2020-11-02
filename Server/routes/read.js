const express = require('express');
const router = express.Router();
const readController = require("../controllers/read");

//=======================================
//             Read Router
//=======================================

router.get('/:userId', readController.getFileInfos);

module.exports = router;