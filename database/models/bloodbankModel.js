const mongoose = require("mongoose");

// module.exports.userRoleEnums = {
//   admin: 1,
//   customer: 2,
// };

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    userType:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bloodBankModel = mongoose.model("bloodbanks", userSchema);

module.exports = bloodBankModel;
