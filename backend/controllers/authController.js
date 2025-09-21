const otpGenerator = require('../utils/otpGenerator');
const User = require('../models/User');
const generateOTP = require('../utils/otpGenerator');
const response= require('../utils/responseHandler');
const sendOtpToEmail = require('../services/emailService');
const twilioService = require('../services/twilioService');
//Step-1 : Generate and send OTP
const sendOtp = async (req, res) => {
    const { email, phoneSuffix, phoneNumber } = req.body;
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    let user;
    try {
        if (email) {
            user = await User.findOne({ email });
            if (!user) {
                user = new User({ email });
            }
            user.emailOtp = otp;
            user.emailOtpExpiry = otpExpiry;
            await user.save();
            await sendOtpToEmail(email,otp)
            return response(res, 200, 'Otp send to your email', { email })
        }
        if (!phoneNumber || !phoneSuffix) {
            return response(res, 400, 'Phone Number and Country Code is Required');
        }
        const fullPhoneNumber = `${phoneSuffix}${phoneNumber}`
        user = await User.findOne({ phoneNumber})
        if (!user) {
            user = new User({phoneNumber,phoneSuffix})
        }
        await twilioService.sendOtpToPhone(fullPhoneNumber);
        await user.save()
        
      return response(res,200,'Otp send successfully',user)
    } catch (error) {
        
    }
}