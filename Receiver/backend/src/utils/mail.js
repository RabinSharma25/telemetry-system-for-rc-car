const nodemailer = require('nodemailer');
const logger = require("../utils/logger");
const config = require('../config/config');
const transport = require('winston').transport;

const sendMail = async (emailId, mailSubject, content) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.mail.server,
      port: config.mail.port,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.mail.email,
        pass: config.mail.password
      }
    });

    const mailOptions = {
      from: config.mail.email,
      to: emailId,
      subject: mailSubject,
      html: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error("Failed to send the mail: ", error);
      } else {
        logger.info("Mail sent successfully: ", info.response);
      }
    });
  } catch (error) {
    logger.error("Error sending email: ", error.message);
  }
};

module.exports = sendMail;
