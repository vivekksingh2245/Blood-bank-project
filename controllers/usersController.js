const userModel = require("../database/models/userModel")
const bloodBankModel = require("../database/models/bloodbankModel");


const registerUser = (req,res)=>{
    const { name, mobilenumber, password, aadhar,bloodgroup } = req.body;
    if(!name.length || !mobilenumber.length || !password.length||!aadhar.length||!bloodgroup.length){
        res.status(400)
        res.json({message:"Fill all the fields first"});
        throw new Error('Please add All field')   
    }
    console.log("dcheckinggggggggg ");
    // res.json({message:"Registration Succesful",data:req.body})
    //Checking if USer already exist
    userModel.findOne({mobilenumber:mobilenumber})
    .then( function(data) {
        console.log("data found: ", data);
        if(data) {
            res.status(400)
            res.json({message:`${data.mobilenumber} number is Already registered`})
            throw new Error('User already exist');
        }
    })
    .catch((err)=>console.log("Error Occured in findOne: ",err.message))

    //Create User
    userModel.create({
        name: name,
        mobilenumber: mobilenumber,
        password: password,
        aadhar: aadhar,
        bloodgroup: bloodgroup,
        userType: "Donar",
        isAdmin: false,
    })
    .then(function(data){
        console.log("new user",data);
        res.json({message: "User Registeration Sucessful",data})
    })
    .catch(function(err){
        console.log("Error is ",err); 
        res.json({err:err.message});
    });
}

const loginUser=   (req, res) => {
        const { mobileusername, password, usertype } = req.body;
        console.log(req.body)
        if(usertype==="Login as:" || !mobileusername.length || !password.length){
            res.json({message:"Fill all the fields first"});
        }else{
                if(usertype==="Donar"){
                    userModel
                    .findOne({mobilenumber: mobileusername})
                    .then( function(data){
                        console.log("User Found",data)
                        if(data){
                            if(data.password===password){
                            res.json({message: "Login successfull",data:data})
                            }else{
                                res.json({message: "Password is Incorrect"})
                            }
                        }else{
                            res.json({message: "Phone number not exist"})
                        }
                    })
                    .catch(function(err){
                        console.log(
                            "Error Occured in findOne"+err
                        )
                        res.json({message: "Invalid Login Details"})
                    });
    
                }else if(usertype==="Blood Bank"){
                    bloodBankModel
                    .findOne({username:mobileusername})
                    .then(function(data){
                        console.log("User Found")
                        if(data){
                            if(data.password===password){
                            res.json({message: "Login successfull",data:data})
                            }else{
                                res.json({message: "Password is Incorrect"})
                            }
                        }else{
                            res.json({message: "Username not exist"})
                        }
                    })
                    .catch(function(err){
                        console.log(
                            "Error Occured in findOne"+err
                        )
                        res.json({message: "Invalid Login Details"})
                    });
                }else if(usertype==="Admin"){
                    userModel
                    .findOne({name: mobileusername})
                    .then( function(data){
                    console.log("User Found")
                    if(data){
                        if(data.password===password){
                        res.json({message: "Login successfull",data:data})
                        }else{
                            res.json({message: "Password is Incorrect"})
                        }
                    }else{
                        res.json({message: "Username not exist"})
                    }
                })
                .catch(function(err){
                    console.log(
                        "Error Occured in findOne"+err
                    )
                    res.json({message: "Invalid Login Details"})
                });
    
                }
            }
    
    }


module.exports = { registerUser,loginUser};