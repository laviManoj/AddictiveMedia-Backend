const authService = require('../services/authServices');
const nodemailer = require('nodemailer');

  const signup = async (req, res) => {
    try {
      const { firstName,lastName,  email, phoneNumber,  } = req.body;

      const password = generatePassword(firstName, lastName, phoneNumber);

      const result = await authService.signup(firstName,lastName, phoneNumber, email, password);
      await sendPasswordEmail(email, password, firstName, lastName, phoneNumber);

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  function generatePassword(firstName, lastName, phoneNumber) {
    const firstPart = firstName.slice(0, 2).toLowerCase();
    const secondPart = lastName.slice(0, 2).toLowerCase();
    const thirdPart = phoneNumber.slice(0, 5);
    return `${firstPart}${secondPart}${thirdPart}`;
  }


  async function sendPasswordEmail(email, password, firstName, lastName, phoneNumber) {
    try {
      console.log(`Sending password ${password} to ${email}`);
  
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, 
        secure: false, 
        auth: {
          user: 'cus.care@romsons.com',
          pass: 'yvhd jqgd hzuy djoq',
        },
      });
  
      let mailOptions = {
        from: 'lavigeremanoj@gmail.com',
        to: email, 
        subject: 'Your Account Created Successfully and Use this Password for LogIn', 
        html: `<p>Dear ${firstName} ${lastName},</p>
              <p>Your Register Mobile Number:- ${phoneNumber} </p>
               <p>Thank you for registering. Your account password is: <strong>${password}</strong></p>
               <p>Please keep this password secure.</p>
               <p>Best regards,<br/>Manoj H</p>`,
      };
  
      // Send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send password email.');
    }
  }


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.signin(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  signup,
  signin,
};