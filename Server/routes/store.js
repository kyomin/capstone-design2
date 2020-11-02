const express = require('express');
const router = express.Router();
const storeController = require("../controllers/store");

//=======================================
//             Store Router
//=======================================

router.post('/', storeController.storeFile);

module.exports = router;