require("dotenv").config();
const nodemailer = require("nodemailer");

const formatChecklistDataForEmail = (items) => {
  return items
    .map(
      (item, index) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${index + 1}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          item.checklist_name
        }</td>
         <td style="padding: 10px; border: 1px solid #ddd;">${
           item.input !== undefined && item.input !== null ? item.input : ""
         }</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          item.comments || "No comments"
        }</td>
      </tr>`
    )
    .join("");
};

const sendEmailToManager = async (userDetails, checklistItems, username) => {
  console.log("userrrname", username);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.OUTLOOK_PASSWORD,
      },
    });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Checklist Submission</h2>
        <p style="font-size: 16px; margin: 0;">Hello,</p>
        <p style="font-size: 16px; margin: 10px 0;">
          <strong>${username}</strong> has successfully submitted a checklist.
        </p>
        <p style="font-size: 16px; margin: 10px 0;">
          <strong>Checklist Details:</strong>
        </p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #ddd;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">S.No</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Description</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Response</th>
              <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Comments</th>
            </tr>
          </thead>
          <tbody>
            ${formatChecklistDataForEmail(checklistItems)}
          </tbody>
        </table>
        <p style="font-size: 16px; margin: 20px 0;">Thank you,</p>
        <p style="font-size: 16px; margin: 0; font-weight: bold;">${username}</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL,
      to: process.env.TO_EMAIL,
      cc: process.env.CC_EMAILS,
      subject: `Checklist Submitted by ${username}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to manager successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const submitChecklist = async (req, res) => {
  try {
    console.log("ssssss", req.user);
    const username = req.user.name;
    console.log("Request Bodyeeeee:", req.body);
    const { userDetails, items } = req.body;

    await sendEmailToManager(userDetails, items, username);

    return res
      .status(200)
      .json({ message: "Checklist submitted successfully!" });
  } catch (error) {
    console.error("Error submitting checklist:", error);
    return res
      .status(500)
      .json({ message: "Failed to submit checklist. Please try again." });
  }
};

module.exports = { submitChecklist };
