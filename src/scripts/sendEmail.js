import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env file (only in local development)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Create a transporter object using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS  // Your Gmail app password
  }
});

// Get the HTML file path from the command-line arguments
const htmlFilePath = process.argv[2];
const resolvedHtmlFilePath = resolve(htmlFilePath); // Resolve the absolute path of the HTML file

// Read the HTML content from the file
let emailHtml;
try {
  emailHtml = readFileSync(resolvedHtmlFilePath, 'utf-8');
} catch (error) {
  console.error(`❌ Failed to read HTML file: ${resolvedHtmlFilePath}`);
  process.exit(1);
}

// Configure the mail options object
const mailOptions = {
    from: process.env.GMAIL_USER, // Sender address
    to: process.env.RECIPIENT_EMAIL, // Recipient address
    subject: 'Your Newsletter Edition is Ready (new Edition)',
    html: emailHtml // Use the HTML content as the email body
  };

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});