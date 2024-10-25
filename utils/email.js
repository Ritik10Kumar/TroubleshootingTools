const nodemailer = require('nodemailer');
const config = require('../config/config');


let transporter = nodemailer.createTransport({
    host: 'smtp.' + config.email.service + '.com',
    port: config.email.service_port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.email.user, // generated ethereal user
        pass: config.email.pass // generated ethereal password
    },
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
    logger: true,
});

async function sendEmail(option) {
    /*
 Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
call back as parameter
*/
    transporter.sendMail(option, function (error, info) {
        console.log(option,"this is option")
        if (error) {
            console.log(error);
            console.log('error')
            if (option.maxRetries > 0) {
              console.log(`Retrying... (${option.maxRetries} retries left)`);
              setTimeout(() => {
                sendEmail(option.maxRetries - 1);
                // sendEmailWithRetry(option.maxRetries - 1);
              }, 5000); // Wait for 5 seconds before retrying
            } else {
              console.error('Max retries reached. Email not sent.');
            } // if error occurs send error as response to client
        }
        else {
            console.log('Email sent: ' + info.response);
            console.log('Sent Successfully')//if mail is sent successfully send Sent successfully as response
        }
    });

    // function sendEmailWithRetry(maxRetries) {
    //     transporter.sendMail(mailOptions, (error, info) => {
    //       if (error) {
    //         console.error('Error sending email:', error);
    //         if (maxRetries > 0) {
    //           console.log(`Retrying... (${maxRetries} retries left)`);
    //           setTimeout(() => {
    //             sendEmailWithRetry(maxRetries - 1);
    //           }, 5000); // Wait for 5 seconds before retrying
    //         } else {
    //           console.error('Max retries reached. Email not sent.');
    //         }
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    //     });
    //   }

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports = {
    sendEmail
}
