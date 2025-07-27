"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Enhanced helper function to handle email sending with verification
async function sendEmailsWithVerification(
  transporter: any,
  ownerMailOptions: any,
  autoReplyOptions: any,
  validatedData: ContactFormData
) {
  // First, send the notification email to you (the owner)
  const ownerEmailResult = await transporter.sendMail(ownerMailOptions);
  console.log("Owner notification email sent:", ownerEmailResult.messageId);

  // Then, try to send the auto-reply confirmation email to the sender
  let autoReplySuccess = false;
  let autoReplyError = null;

  try {
    const autoReplyResult = await transporter.sendMail(autoReplyOptions);
    console.log(
      "Auto-reply confirmation email sent:",
      autoReplyResult.messageId
    );
    autoReplySuccess = true;
  } catch (autoReplyErr: any) {
    console.error(
      "Failed to send auto-reply confirmation email:",
      autoReplyErr
    );
    autoReplyError = autoReplyErr;
    autoReplySuccess = false;

    // Check if it's specifically an invalid email error
    const isInvalidEmail = checkIfInvalidEmail(autoReplyErr);

    // Send warning email about potentially fake/invalid email
    const warningEmailOptions = createWarningEmail(
      validatedData,
      autoReplyError,
      isInvalidEmail
    );

    try {
      await transporter.sendMail(warningEmailOptions);
      console.log(
        "Warning email sent about potentially invalid/fake email address"
      );
    } catch (warningErr) {
      console.error("Failed to send warning email:", warningErr);
      // Don't throw here - the main contact email was sent successfully
    }
  }

  return {
    success: true,
    message: autoReplySuccess
      ? "Email sent successfully! Confirmation email delivered to sender."
      : "Email received! However, the confirmation email could not be delivered to the provided email address. This may indicate an invalid email.",
    autoReplyDelivered: autoReplySuccess,
  };
}

// Function to check if the email error indicates an invalid/fake email
function checkIfInvalidEmail(error: any): boolean {
  if (!error) return false;

  const errorMessage = error.message?.toLowerCase() || "";
  const errorCode = error.code?.toLowerCase() || "";

  // Common indicators of invalid/fake emails
  const invalidEmailIndicators = [
    "recipient address rejected",
    "user unknown",
    "mailbox not found",
    "no such user",
    "invalid recipient",
    "address not found",
    "user does not exist",
    "unknown user",
    "invalid mailbox",
    "recipient not found",
    "550", // Common SMTP error code for invalid recipient
    "551", // User not local
    "553", // Mailbox name not allowed
  ];

  return invalidEmailIndicators.some(
    (indicator) =>
      errorMessage.includes(indicator) || errorCode.includes(indicator)
  );
}

function createOwnerNotificationEmail(validatedData: ContactFormData) {
  return {
    from: process.env.EMAIL_USER,
    to: "rabinkarmakar947@gmail.com",
    subject: `New Contact Form Message: ${validatedData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center; margin-bottom: 30px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
          <h3 style="color: #495057; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #6c757d;">${validatedData.message.replace(
            /\n/g,
            "<br>"
          )}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #1565c0; font-size: 14px;">
            Reply directly to this email to respond to ${validatedData.name}
          </p>
        </div>
      </div>
    `,
  };
}

function createAutoReplyEmail(validatedData: ContactFormData) {
  return {
    from: process.env.EMAIL_USER,
    to: validatedData.email,
    subject: `Thank you for contacting me, ${validatedData.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center; margin-bottom: 30px;">Thank You for Your Message!</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0; line-height: 1.6; color: #495057;">Hi ${
            validatedData.name
          },</p>
          <br>
          <p style="margin: 0; line-height: 1.6; color: #495057;">
            Thank you for reaching out! I've received your message about "${
              validatedData.subject
            }" and I'll get back to you as soon as possible.
          </p>
          <br>
          <p style="margin: 0; line-height: 1.6; color: #495057;">
            I typically respond to messages within 24-48 hours. In the meantime, feel free to check out my other projects on my portfolio.
          </p>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2e7d32; margin-top: 0;">Your Message Summary</h3>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong> ${
            validatedData.message.length > 100
              ? validatedData.message.substring(0, 100) + "..."
              : validatedData.message
          }</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            Best regards,<br>
            <strong>Rabin Karmakar</strong><br>
            Full Stack Developer
          </p>
        </div>
      </div>
    `,
  };
}

function createWarningEmail(
  validatedData: ContactFormData,
  error: unknown,
  isLikelyInvalid: boolean
) {
  const errorMessage =
    error && typeof error === "object" && "message" in error
      ? String(error.message)
      : "Unknown error occurred while sending confirmation email";

  const warningLevel = isLikelyInvalid
    ? "🚨 FAKE/INVALID EMAIL DETECTED"
    : "⚠️ EMAIL DELIVERY FAILED";
  const borderColor = isLikelyInvalid ? "#dc3545" : "#ff6b35";
  const bgColor = isLikelyInvalid ? "#f8d7da" : "#fff8f6";
  const textColor = isLikelyInvalid ? "#721c24" : "#d63031";

  return {
    from: process.env.EMAIL_USER,
    to: "rabinkarmakar947@gmail.com",
    subject: `${warningLevel}: Contact Form Alert`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid ${borderColor}; border-radius: 10px; background-color: ${bgColor};">
        <h2 style="color: ${textColor}; text-align: center; margin-bottom: 30px;">${warningLevel}</h2>
        
        <div style="background-color: ${
          isLikelyInvalid ? "#f5c6cb" : "#ffe8e6"
        }; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid ${textColor};">
          <h3 style="color: ${textColor}; margin-top: 0;">
            ${
              isLikelyInvalid
                ? "🚫 Fake/Invalid Email Address Detected!"
                : "Auto-Reply Failed"
            }
          </h3>
          <p style="margin: 0; line-height: 1.6; color: #2d3436;">
            ${
              isLikelyInvalid
                ? "The email address provided appears to be fake or invalid. This contact submission is likely spam or from someone using a non-existent email address."
                : "The confirmation email could not be delivered to the sender. This might indicate:"
            }
          </p>
          ${
            !isLikelyInvalid
              ? `
            <ul style="color: #2d3436; margin: 10px 0;">
              <li>Invalid or non-existent email address</li>
              <li>Temporary/disposable email service</li>
              <li>Email server issues on their end</li>
              <li>Spam/security filters blocking the email</li>
            </ul>
          `
              : ""
          }
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #495057; margin-top: 0;">
            ${
              isLikelyInvalid
                ? "Suspicious Contact Details"
                : "Contact Details (Unverified)"
            }
          </h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> <span style="color: ${textColor}; font-weight: bold; text-decoration: ${
      isLikelyInvalid ? "line-through" : "none"
    };">${validatedData.email}</span></p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #495057; margin-top: 0;">Message Content</h3>
          <p style="line-height: 1.6; color: #6c757d;">${validatedData.message.replace(
            /\n/g,
            "<br>"
          )}</p>
        </div>

        <div style="background-color: ${
          isLikelyInvalid ? "#d1ecf1" : "#fff3cd"
        }; padding: 15px; border-radius: 8px; border-left: 5px solid ${
      isLikelyInvalid ? "#0c5460" : "#ffc107"
    };">
          <h4 style="color: ${
            isLikelyInvalid ? "#0c5460" : "#856404"
          }; margin-top: 0;">
            ${isLikelyInvalid ? "🛡️ SECURITY RECOMMENDATION" : "Recommendation"}
          </h4>
          <p style="margin: 0; color: ${
            isLikelyInvalid ? "#0c5460" : "#856404"
          }; font-size: 14px;">
            ${
              isLikelyInvalid
                ? "<strong>DO NOT RESPOND</strong> to this contact. The email address is invalid/fake. This is likely spam or a test submission. Consider implementing additional spam protection measures."
                : "Consider verifying this email address before responding. The person may have provided incorrect contact information intentionally or accidentally."
            }
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0; color: #1565c0; font-size: 14px;">
            <strong>Technical Error Details:</strong><br>
            ${errorMessage}
          </p>
        </div>

        ${
          isLikelyInvalid
            ? `
          <div style="text-align: center; margin-top: 15px; padding: 10px; background-color: #ffebee; border-radius: 8px; border: 1px solid #f44336;">
            <p style="margin: 0; color: #c62828; font-size: 12px; font-weight: bold;">
              ⚠️ This email was automatically flagged as suspicious. Review your spam protection settings if you're receiving too many fake submissions.
            </p>
          </div>
        `
            : ""
        }
      </div>
    `,
  };
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(data);

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error(
        "Missing email configuration: EMAIL_USER or EMAIL_PASS not set"
      );
      return {
        success: false,
        message:
          "Email service is not configured. Please contact me directly at rabinkarmakar947@gmail.com",
      };
    }

    // Create a transporter using Gmail SMTP with explicit configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This MUST be a Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify the connection before sending emails
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      throw new Error(
        "Email service configuration error. Please check your credentials."
      );
    }

    // Email content for the site owner (you)
    const ownerMailOptions = createOwnerNotificationEmail(validatedData);

    // Auto-reply email for the sender
    const autoReplyOptions = createAutoReplyEmail(validatedData);

    // Send emails with verification
    try {
      return await sendEmailsWithVerification(
        transporter,
        ownerMailOptions,
        autoReplyOptions,
        validatedData
      );
    } catch (emailError) {
      console.error("Failed to send owner notification email:", emailError);
      throw emailError;
    }
  } catch (error) {
    console.error("Error sending email:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid form data",
        errors: error.issues,
      };
    }

    // Handle specific email authentication errors
    if (error && typeof error === "object" && "code" in error) {
      if (error.code === "EAUTH") {
        return {
          success: false,
          message:
            "Email authentication failed. Please check that you're using a Gmail App Password and that 2-Factor Authentication is enabled.",
        };
      }
      if (error.code === "ECONNECTION") {
        return {
          success: false,
          message:
            "Unable to connect to email service. Please check your internet connection.",
        };
      }
    }

    return {
      success: false,
      message:
        "Failed to send email. Please try again or contact me directly at rabinkarmakar947@gmail.com",
    };
  }
}
