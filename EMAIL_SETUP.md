# Email Setup Instructions

This project uses Nodemailer with Gmail SMTP for the contact form functionality.

## Setup Steps

1. **Copy environment file:**

   ```bash
   cp .env.example .env.local
   ```

2. **Enable 2-Factor Authentication on your Gmail account** (if not already enabled)

3. **Generate an App Password:**

   - Go to [Google Account settings](https://myaccount.google.com/)
   - Select **Security** from the left sidebar
   - Under "Signing in to Google," select **App passwords**
   - Generate a password for "Mail"
   - Copy the 16-character password (without spaces)

4. **Update .env.local:**

   ```bash
   EMAIL_USER=rabinkarmakar947@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

5. **Test the contact form:**
   - Start the development server: `pnpm dev`
   - Navigate to the contact section
   - Fill out and submit the form
   - Check both your email and the sender's email for confirmation

## How it works

- When a user submits the contact form, the system now includes **email verification**:
  1. **Notification email** to you (rabinkarmakar947@gmail.com) with the user's message - _always sent_
  2. **Auto-reply email** to the user confirming their message was received - _attempted_
  3. **Warning email** to you if the auto-reply fails (indicating potentially invalid email address)

## 🛡️ Email Verification System

The contact form now includes a **smart verification system** that detects potentially invalid email addresses:

### How the verification works:

1. **Primary notification**: You receive the contact form submission immediately
2. **Confirmation attempt**: System tries to send a confirmation email to the sender
3. **Verification check**: If the confirmation email fails to deliver:
   - You receive a **warning email** about the potentially invalid address
   - The warning includes details about why the email might be problematic
   - You can decide whether to respond or ignore the contact

### What triggers a warning:

- Non-existent email addresses
- Temporary/disposable email services (like 10minutemail.com)
- Blocked or full email inboxes
- Email servers that reject the confirmation message

### Benefits:

- ✅ **Prevents spam**: Invalid emails are flagged automatically
- ✅ **Saves time**: No need to respond to undeliverable addresses
- ✅ **Better security**: Reduces fake contact attempts
- ✅ **Professional**: Legitimate contacts still work normally

## 📧 Email Types You'll Receive

1. **Contact Form Notification** (always sent):

   - Contains the user's message and contact details
   - Sent immediately when someone submits the form

2. **Warning Email** (sent only when confirmation fails):
   - Has a red border and warning icons ⚠️
   - Explains why the confirmation failed
   - Includes the original message for your reference
   - Suggests the email address might be invalid

## Troubleshooting

- **"Authentication failed"**: Make sure you're using an App Password, not your regular Gmail password
- **"Connection refused"**: Check your internet connection and Gmail SMTP settings
- **Form not submitting**: Check the browser console for JavaScript errors

## Alternative Email Providers

If you prefer to use a different email provider, update the transporter configuration in `src/app/actions/contact.ts`:

```typescript
const transporter = nodemailer.createTransport({
  host: "your-smtp-host",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```
