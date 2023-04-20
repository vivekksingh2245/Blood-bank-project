const express = require('express');
const router = express.Router();

const {registerBloodBank,getAllBloodBank} = require("../../controllers/bloodbanksController")

router.post('/create-blood-bank',registerBloodBank)
router.get('/bloodbanklist',getAllBloodBank);

module.exports = router;