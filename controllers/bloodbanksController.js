
const bloodBankModel = require("../database/models/bloodbankModel");


//Create Blood bank post request
const registerBloodBank = (req,res)=>{
    const { bloodbankname, username, password, address } = req.body;
    console.log(req.body)
    if(!username.length || !bloodbankname.length || !password.length || !address.length){
        res.json({message:"Fill all the fields first"});
    }else{
           // res.json({message:"Registration Succesful",data:req.body})
    bloodBankModel
    .findOne({username:username})
    .then( function(data) {
        console.log("data found: ", data);
        if(data) {
            res.json({message:`${data.username}  is Already registered`})
        }else{
            bloodBankModel
                .create({
                    name: bloodbankname,
                    username: username,
                    password: password,
                    address:address,
                    userType: "Blood Bank",
                })
                .then(function(data){
                    console.log("new blood bank ",data);
                    res.json({message: "Blood bank Created",data:data})
                    
                })
                .catch(function(err){
                    console.log("Error is ",err); 
                    res.json({err : err});
                });
        }
    })
    .catch(function(err){
        console.log(
            "Error Occured in findOne",err
        )
    });
    }
}


//get request api for getting all Blood bank

const getAllBloodBank = (req,res) => {
    const allBloodBank=
    bloodBankModel.find({})
    .then(function(data){
        console.log(data)
        res.json({message:"Fetched",data:data})
    })
}

module.exports = {registerBloodBank,getAllBloodBank};