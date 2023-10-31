import MailSender from "../interfaces/mailSender.interface";
import nodeMailer, { SentMessageInfo } from "nodemailer";
import smtpConfig from "../utils/smtpConfigs";

const smtpService = async (data: MailSender): Promise<void> => {
  const transporter = nodeMailer.createTransport(smtpConfig);
  const mailOptions = { from:process.env.EMAIL_USER,...data };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions); 
    console.log(info.response);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to send the email.");
  }
};

export default smtpService;
