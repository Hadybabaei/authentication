const smtpConfig = {
  host: "smtp.ionos.co.uk",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

export default smtpConfig;
