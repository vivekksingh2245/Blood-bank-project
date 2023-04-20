const express = require('express');

const router = express.Router();

const{
    createDonation,
    getAllDonarList,
    getUserAllDonation,
    verifyDonar,
    downloadDonationPDF,
    
} = require("../../controllers/donationsController");



//Submitting Donation done to Donation Schema
router.post('/create-donation',createDonation)

//Post request from bllod bank to get all the donation done at there
router.post('/donarlist',getAllDonarList)

//Donated list of total user donation
router.post('/mydonation',getUserAllDonation)

//Post request api for verifying donar
router.post('/verifydonar',verifyDonar)

//Verified donar Pdf download call
router.post('/download',downloadDonationPDF)

module.exports = router;