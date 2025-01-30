require("dotenv").config();
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const formatChecklistDataForEmail = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return `<tr><td colspan="4" style="padding: 10px; border: 1px solid #ddd;">No checklist items found.</td></tr>`;
  }

  return items
    .map(
      (item, index) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${index + 1}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          item.checklist_name || "N/A"
        }</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          item.input ?? ""
        }</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          item.comments || "No comments"
        }</td>
      </tr>`
    )
    .join("");
};

const sendEmailToManager = async (
  username,
  checklistItems,
  recipientEmail,
  ccEmails
) => {
  try {
    if (!recipientEmail || recipientEmail.length === 0) {
      console.error("Error: No recipient emails found.");
      throw new Error("No recipients provided.");
    }

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
        <p>Hello,</p>
        <p><strong>${username}</strong> has successfully submitted a checklist.</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #ddd;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd;">S.No</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Response</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Comments</th>
            </tr>
          </thead>
          <tbody>
            ${formatChecklistDataForEmail(checklistItems)}
          </tbody>
        </table>
          <p style="margin-top: 20px;"><strong>Thanks,</strong></p>
    <p><strong>${username}</strong></p>
      </div>
    `;

    const mailOptions = {
      from: process.env.OUTLOOK_EMAIL,
      to: recipientEmail.join(", "),
      cc: ccEmails.filter(Boolean).join(", "),
      subject: `Checklist Submitted by ${username}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

const submitChecklist = async (req, res) => {
  console.log("User:", req.user);
  try {
    const username = req.user?.name;
    const { checklistTemplateId, checklistItems } = req.body;
    console.log("IIIIIIIIIIIIIIII", checklistTemplateId);

    if (!checklistTemplateId) {
      console.error("Error: checklistTemplateId is undefined or missing.");
      return res
        .status(400)
        .json({ error: "Checklist Template ID is required." });
    }

    console.log("Received checklistTemplateId:", checklistTemplateId);

    const templateRecipients = await prisma.templateRecipients.findMany({
      where: { checklist_template_id: checklistTemplateId },
      select: { recipient_email: true, cc_bcc_emails: true },
    });

    if (!templateRecipients || templateRecipients.length === 0) {
      console.error("No recipients found for template:", checklistTemplateId);
      return res
        .status(404)
        .json({ message: "No recipients found for the template." });
    }

    const recipientEmails = templateRecipients
      .map((r) => r.recipient_email)
      .filter(Boolean);
    const ccEmails = templateRecipients
      .map((r) => r.cc_bcc_emails)
      .filter(Boolean);

    await sendEmailToManager(
      username,
      checklistItems,
      recipientEmails,
      ccEmails
    );

    res
      .status(200)
      .json({ message: "Checklist submitted and email sent successfully!" });
  } catch (error) {
    console.error("Error submitting checklist:", error);
    res
      .status(500)
      .json({ message: "Failed to submit checklist. Please try again." });
  }
};

const addRecipient = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);

    if (!req.user || !req.user.user_id) {
      return res.status(400).json({ message: "User not authenticated." });
    }

    const { checklist_template_id, recipient_email, recipient_role } = req.body;

    if (!["to", "cc", "bcc"].includes(recipient_role)) {
      return res
        .status(400)
        .json({ message: "Recipient role must be 'to', 'cc', or 'bcc'." });
    }

    if (!checklist_template_id || !recipient_email) {
      return res.status(400).json({
        message: "Checklist Template ID and recipient email are required.",
      });
    }

    const userId = req.user.user_id;

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      return res.status(400).json({ message: "User not found." });
    }

    const newRecipient = await prisma.templateRecipients.create({
      data: {
        checklist_template_id,
        recipient_email,
        cc_bcc_emails: recipient_role,
        assigned_by_user_id: userId,
      },
    });

    res.status(200).json({
      message: "Recipient added successfully",
      recipient: newRecipient,
    });
  } catch (error) {
    console.error("Error adding recipient:", error);
    res
      .status(500)
      .json({ message: "Failed to add recipient. Please try again." });
  }
};

module.exports = { submitChecklist, addRecipient };
