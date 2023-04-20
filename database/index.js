module.exports.init = function () {
    const mongoose = require("mongoose");
  
    mongoose
      .connect(
        "mongodb+srv://rohit:rohit@cluster0.htd31el.mongodb.net/bloodbankdb?retryWrites=true&w=majority"
      )
      .then(function () {
        console.log("DB is Connected !!!");
      })
      .catch(function () {
        console.log("Error in DB Conne ction");
      });
  };
  

