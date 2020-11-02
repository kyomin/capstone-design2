const express = require('express');
const router = express.Router();
const confirmController = require("../controllers/confirm");

//=======================================
//             Confirm Router
//=======================================

router.post('/', confirmController.confirmFileIntegrity);

module.exports=router;