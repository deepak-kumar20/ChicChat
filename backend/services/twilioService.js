const twilio = require("twilio");

//congigure twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);

//send otp to the phone number
const sendOtpToPhone = async (phoneNumber) => {
  try {
    console.log("Sending OTP to phone number:", phoneNumber);
    if (!phoneNumber) throw new Error("Phone number is required");
    const response = await client.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });
    console.log("OTP sent successfully:", response);
    return response;
  } catch (error) {
    console.log("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

//opt verification
const verifyOtp = async (phoneNumber, otp) => {
  try {
    console.log("This is my otp:", otp);

    console.log("verifying Otp for phone number:", phoneNumber);
    const response = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: otp,
      });
    return response;
  } catch (error) {
    console.log("Error verifying OTP:", error);
    throw new Error("Failed to verify OTP");
  }
};

module.exports = { sendOtpToPhone, verifyOtp };