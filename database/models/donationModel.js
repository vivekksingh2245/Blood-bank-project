const mongoose = require("mongoose");

// module.exports.userRoleEnums = {
//   admin: 1,
//   customer: 2,
// };

const userSchema = new mongoose.Schema(
  {
    donarID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],

    bloodBankID: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'bloodbanks' ,
       }],
    address: {
      type: String,
      required: true,
    },
    isVerified:{
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const donationModel = mongoose.model("donations", userSchema);

module.exports = donationModel;
