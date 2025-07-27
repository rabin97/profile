# 🚨 Gmail Setup Guide - IMPORTANT! 🚨

The error you're seeing (`535-5.7.8 Username and Password not accepted`) means Gmail is rejecting your login credentials. This is a common issue that requires specific setup steps.

## ❌ What's NOT Working

- Using your regular Gmail password
- Not having 2-Factor Authentication enabled
- Not using an App Password

## ✅ What You Need To Do

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click "2-Step Verification"
3. Follow the setup process if not already enabled

### Step 2: Generate an App Password

1. Still in [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" from the dropdown
4. Copy the 16-character password (it looks like: `abcdefghijklmnop`)

### Step 3: Update Your .env.local File

```bash
# Open your .env.local file and update:
EMAIL_USER=rabinkarmakar947@gmail.com
EMAIL_PASS=abcdefghijklmnop  # <- Replace with your actual 16-character app password
```

### Step 4: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C) then restart:
pnpm dev
```

## 🔍 How to Verify It's Working

1. Check the terminal output - you should see "SMTP connection verified successfully"
2. Try submitting the contact form
3. Check your email for both the notification and auto-reply

## 🐛 Common Issues

**"App passwords" option not showing?**

- Make sure 2-Factor Authentication is enabled first
- It might take a few minutes to appear after enabling 2FA

**Still getting authentication errors?**

- Double-check you copied the App Password correctly (no spaces)
- Make sure you're using the App Password, not your regular password
- Try generating a new App Password

**Environment variables not loading?**

- Make sure the file is named `.env.local` (not `.env.txt` or similar)
- Restart your development server after making changes
- Check that there are no extra spaces around the equals sign

## 📧 Alternative: Using a Different Email Service

If Gmail continues to give you trouble, you can use other email services:

### Using Outlook/Hotmail

```javascript
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@outlook.com",
    pass: "your-password", // Regular password works for Outlook
  },
});
```

### Using a Service like Mailtrap (for testing)

```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "your-mailtrap-user",
    pass: "your-mailtrap-pass",
  },
});
```

## 🆘 Still Having Issues?

If you're still having problems:

1. Check the browser console for any JavaScript errors
2. Check the terminal for server errors
3. Try the contact form and let me know the exact error message
4. Verify your .env.local file has the correct App Password

The key is using the **App Password**, not your regular Gmail password!
