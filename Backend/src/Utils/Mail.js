import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

//   port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "nitesh.spam8652@gmail.com",
    pass: "gkutsbjteltjqwbf",
  },
 
});
  transporter.verify()
  .then(() => console.log('📧 SMTP connection OK'))
  .catch(err => console.error('❌ SMTP connection error:', err));

// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({

   
export async function sendmail(to, subject, text, html) {

    
  const mailOptions = {
    from: '"Nitesh" <nitesh.spam8652@gmail.com>', // sender address
    to,                                          // recipient(s)
    subject,                                     // subject line
    text,                                        // plain text body
    html: `<b>${text}</b>`,                      // html body (optional)
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Message sent:", info.messageId);
  return info;
}

