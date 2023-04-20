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
    mobilenumber: {
      type: Number,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    aadhar: {
      type: Number,
      required: true,
      unique:true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    userType:{
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
