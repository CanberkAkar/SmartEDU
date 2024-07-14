const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: "index"
    });
}

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    });
}
exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: "register"
    });
}
exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: "login"
    });
}
exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: "contact"
    });
}

exports.sendEmail = (req, res) => {
    try{

   
   const outputMessage=`
   <h1>Mail Details </h1>
   <ul>
        <li>Name:${req.body.name}<li>
        <li>Email:${req.body.email}<li>
   </ul>
   <h1>Message${req.body.message}</h1>
   <p></p>
   `;

   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mail", //gmail account
      pass: "pass", //gmail password
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"SMART EDU 👻" mail', // sender address
      to: "mail", // list of receivers
      subject: "SMART EDU", // Subject line
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    }

    req.flash("success","We Received your message succesfully");

    main().catch(console.error);
    res.status(200).redirect('contact');
    }
    catch{
        req.flash("error","Something happend");
        res.status(400).redirect('contact');

    }
}