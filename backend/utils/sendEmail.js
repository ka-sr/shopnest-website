const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message, throwOnError = false }) => {
  try {
    const gmailUser = process.env.GMAIL_USER?.trim();
    const gmailPass = process.env.GMAIL_PASS?.replace(/\s/g, '');

    if (!gmailUser || !gmailPass) {
      throw new Error('Email credentials missing. Set GMAIL_USER and GMAIL_PASS in backend/.env');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass, // Use a Gmail App Password, not the account password.
      },
    });

    const mailOptions = {
      from: `"ShopNest Support" <${gmailUser}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    if (throwOnError) {
      throw error;
    }
  }
};

module.exports = sendEmail;
