const donationModel = require("../database/models/donationModel")
const PDFDocument = require('pdfkit');

const createDonation = (req,res)=>{
    const { donarID, bloodbankID, address,isVerified } = req.body;
    donationModel.create({
        donarID:donarID,
        bloodBankID:bloodbankID,
        address:address,
        isVerified:isVerified,

    })
    .then(function(data){
        console.log("new Donation ",data);
        res.json({message: "Donation Done"})
        
    })
    .catch(function(err){
        console.log("Error is ",err); 
        res.json({err : err});
    });
}
//Get the list of all donar done donation at specific bloodbank
// return donation populated donarid
const getAllDonarList =(req,res)=>{
    const { bloodBankID} = req.body;
    donationModel.find({bloodBankID:bloodBankID})
    .populate('donarID')
    .then(function(data){
        console.log(" Donated user ",data);
        res.json({message: "Donated user fetched",data: data})
        
    })
    .catch(function(err){
        console.log("Error is ",err); 
        res.json({err : err});
    });
}

//Get the list of all bloodbank at which donation done for specific user
// return donation populated bloodbank
const getUserAllDonation =(req,res)=>{
    const {donarID} = req.body;
    donationModel
    .find({donarID:donarID})
    .populate('bloodBankID')
    .then(function(data){
        console.log(" My total donation ",data);
        res.json({message: "My total donation",data: data})
        
    })
    .catch(function(err){
        console.log("Error is ",err); 
        res.json({err : err});
    });
}

// Verify the donar that done donation at specific bloodbank 
// Update donation database isverified field
const verifyDonar = (req,res) => {
    const {donationId} = req.body; 
    donationModel.findOneAndUpdate({_id:donationId},{isVerified:true})
    .then(function(data){
        console.log("Donation verified: ");
        res.json({message:"Donar verified"})
    })
    .catch(function(err){
        console.log("Error is ",err); 
        res.json({err : err});
    });
    
}

//Download pdf from user after verifed
//Get the donation matching donationid 
// return blob
const downloadDonationPDF = (req,res)=>{
    const {donationID} = req.body;
    donationModel
    .findOne({_id:donationID})
    .populate([{ path: 'bloodBankID' }, { path: 'donarID' }])
    .then(function(data){
        console.log("Download Request",data);
        
        const doc = new PDFDocument();

        const timestamp = data.createdAt;
        const dateTime = new Date(timestamp);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');

        doc.pipe(res);
        
        doc.fontSize(25).text('Blood Donation Receipt', {
            align: 'center'
        });

        doc.fontSize(20).text(`
            Name: ${data.donarID[0].name}
            Aadhaar Number: ${data.donarID[0].aadhar}
            Blood Group: ${data.donarID[0].bloodgroup}
            Blood Bank Name: ${data.bloodBankID[0].name}
            Date of Blood Donation: ${date}
            Time of Blood Donation: ${time}
            Address of Blood Bank: ${data.bloodBankID[0].address}
        `, {
            align: 'left',
            indent: 50
        });

        doc.end();  
    })
    .catch(function(err){
        console.log("Error is ",err); 
        res.json({err : err});
    });
}

module.exports = {
    createDonation,
    getAllDonarList,
    getUserAllDonation,
    verifyDonar,
    downloadDonationPDF
};