const OTPModel = require("../../model/OTPModel");

const VerifyOtpController = async (req, res) => {
  try {
    const {otp, email }= req?.body

    const isOtpValid = await OTPModel.findOne({email: email})
    if(isOtpValid?.otp === otp){
      return res.status(200).json({
        error: false,
        success: true,
        message : "OTP verified, Enter your new password",
      });
    }else{
      throw new Error("Invalid Otp, Please enter correct OTP..!")
    }

  } catch (error) {
    return res.status(500).json({
      error: true,
      success: false,
      error: error.message || error,
    });
  }
};

module.exports = VerifyOtpController;
