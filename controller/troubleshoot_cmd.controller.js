// TROUBLE SHOOTING COMMANDS

// const { exec } = require('node:child_process');
// // const { spawn } = require('child_process');
const { exec } = require('child_process');

const nodemailer = require('nodemailer');
const config = require('../config/config');
let email = require("../utils/email");





const ping_controller = async (req, res) => {

    const pingProcess = exec(`ping ${req.body.ip}`);
    let output = '';
    pingProcess.stdout.on('data', (data) => {
        output = data;
    });


    pingProcess.on('exit', (code) => {
        if (code === 0) {
            res.status(200).send(output)
        } else {
            res.status(200).send(`${req.body.ip} is not reachable`)
        }
    });
}


const ipconfig_controller = async (req, res) => {

    const ipconfigProcess = exec('ipconfig');
    let output = '';
    ipconfigProcess.stdout.on('data', (data) => {
        output += data;
    });


    ipconfigProcess.on('exit', (code) => {
        if (code === 0) {
            res.status(200).send(output)
        } else {
            res.status(200).send('command is not reachable')
        }
    });
}

const netstat_controller = async (req, res) => {

    const netstatProcess = exec('netstat');
    let output = '';
    netstatProcess.stdout.on('data', (data) => {
        output += data;
    });


    netstatProcess.on('exit', (code) => {
        if (code === 0) {
            res.status(200).send(output)
        } else {
            res.status(200).send('command is not reachable')
        }
    });
}


const nslookup_controller = async (req, res) => {
    exec(`nslookup  ${req.body.ip} `, (err, stdout, stderr) => {
        if (err) {
            console.log('A')
            console.log(`error: ${err.message}`);
            res.status(200).send(`** server can't find ${req.body.ip}.in-addr.arpa: NXDOMAIN`)
        }
        else if (stdout) {
            console.log('B')
            console.log(`stdout: ${stdout}`, '][][][][][]][][');
            res.status(200).send(stdout)
        }

        else {
            console.log('C')
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }


    })
}




const tracepath_controller = async (req, res) => {
    console.log(req.body)
    exec(`tracert  ${req.body.ip} `, (err, stdout, stderr) => {

        // exec(`tracepath  ${req.body.ip} `, (err, stdout, stderr) => {  // for linux machine
        if (err) {
            console.log('A')
            console.log(`error: ${err.message}`);
            res.status(200).send(err)
        }
        else if (stderr) {
            console.log('B')
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log('C')
            console.log(`stdout: ${stderr}`);
            res.status(200).send(stdout)
        }
    })
}

const telnet_controller = async (req, res) => {
    const { spawn } = require('child_process');

    // Replace 'hostname' and 'port' with the target host and port
    const telnetProcess = spawn('telnet', [`${req.body.ip}`, `${req.body.port}`]);

    // Set a timeout to kill the telnet process after 5 seconds
    const timeout = setTimeout(() => {
        telnetProcess.kill(); // Kill the telnet process
        console.log('Telnet process killed after 5 seconds.');
    }, 5000);

    // Listen for telnet process events
    telnetProcess.stdout.on('data', (data) => {
        console.log('Telnet stdout:', data.toString());
    });

    telnetProcess.stderr.on('data', (data) => {
        console.error('Telnet stderr:', data.toString());
    });

    telnetProcess.on('close', (code) => {
        console.log(`Telnet process exited with code ${code}`);
        clearTimeout(timeout); // Clear the timeout
    });
    return "hello"
    // console.log(req.body)
    // exec(`telnet ${req.body.ip} ${req.body.port} `, (err, stdout, stderr) => {
    //     console.log("yaha aa gye h hum")
    //     if (err) {
    //         console.log('A')
    //         console.log(`error: ${err.message}`);
    //         res.status(200).send(`telnet: Unable to connect to remote host (${req.body.ip} ${req.body.port}): Connection refused`)
    //     }
    //     else if (stderr) {
    //         console.log('B')
    //         console.log(`stderr: ${stderr}`);
    //         res.status(200).send(stderr)
    //     }

    //     else {
    //         console.log('C')
    //         console.log(`stdout: ${stdout}`);
    //         res.status(200).send(stdout)
    //     }

    // })
}

const udp_controller = async (req, res) => {
    exec(`nc -z -v -u ${req.body.ip} ${req.body.port} `, (err, stdout, stderr) => {
        if (err) {
            console.log('A')
            console.log(`error: ${err.message}`);
            res.status(200).send("No Connection Found")
        }
        else if (stderr) {
            console.log('B')
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log('C')
            console.log(`stdout: ${stdout}`, '][][][][][]][][');
            res.status(200).send(stdout)
        }

    })
}

const nmap_controller = async (req, res) => {
    console.log(req.body)
    exec(`nmap -v  ${req.body.ip} `, (err, stdout, stderr) => {
        if (err) {
            console.log('A')
            console.log(`error: ${err.message}`);
            res.status(200).send(err)
        }
        else if (stderr) {
            console.log('B')
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log('C')
            console.log(`stdout: ${stderr}`);
            res.status(200).send(stdout)
        }
    })

}



const mail_controller =async  (req, res) => {
    var mailOptions = {
        from: config.email.user, //replace with your email
        to: "ritik10kumar@gmail.com", //replace with your email
        // to: req.body.mail_to.split(","), //replace with your email
        subject: "Test Email",
        html: `
        <h3>Hi Team,</h3>
        <h3>Please Find the attached report</h3><br>
        <h4> Best Regards!!</h4>
        <h4>${config.email.name}</h4>
        `,
        text: 'This is a test email from your fake emailer.',
        maxRetries:3,
    };

    // email.sendEmail(mailOptions, (error, info) => {
    //             console.log("][this is mail options", info)
    //             if (error) {
    //                 console.error('Error: ' + error);
    //             } else {
    //                 console.log('Email sent: ' + info.body);
    //             }
    //         });

    email.sendEmail(mailOptions);
        res.status(250).send({
          message: "mail send",
        });


        
}



// const mail_controller = async (req, res) => {
//     // Create a fake transporter that captures emails
//     const fakeTransporter = nodemailer.createTransport({
//         streamTransport: true, // Use stream transport to capture emails
//         newline: 'unix', // Use UNIX-style line endings
//         // newline: '\r\n', // Use  for windwos
//         buffer: true, // Buffer the emails
//         debug: true, // Enable debugging
//     });


//     // Intercept outgoing emails
//     fakeTransporter.on('stream', email => {
//         console.log(email)
//         email.pipe(process.stdout); // Log the email content to the console
//     });

//     // Create an example email
//     const mailOptions = {
//         // GMAIL_USERNAME=harshsuryavanshi170@gmail.com
// // GMAIL_PASSWORD=bvxh skhy qonb tsel
//         from: 'harshsuryavanshi170@gmail.com', //'sender@example.com'
//         //   from: 'harshsuryavanshi170@gmail.com', //'sender@example.com'
//         to: 'ritik10kumar@gmail.com',//'recipient@example.com',arjunsingh3007as@gmail.com
//         //   to: 'jocihoj574@wisnick.com',//'recipient@example.com',arjunsingh3007as@gmail.com
//         subject: 'Test Email',
//         text: 'This is a test email from your fake emailer.',
//     };

//     // Send the example email
//     fakeTransporter.sendMail(mailOptions, (error, info) => {
//         console.log("][this is mail options", info)
//         if (error) {
//             console.error('Error: ' + error);
//         } else {
//             console.log('Email sent: ' + info.body);
//         }
//     });

    

//     res.status(200).send("mail done")
// }






module.exports = {
    ping_controller, //done     ON FROINTEND
    ipconfig_controller, //done   ON FRONTEND
    netstat_controller, //done       
    nslookup_controller, //done       ON FRONTEND
    tracepath_controller, //done       ON FRONTEND
    nmap_controller, //                 ON FRONTEND
    udp_controller,//                     ON FRONTEND not use in Windows
    telnet_controller, // not in nuse       need add autotime out to exit command
    mail_controller, // to send mails
    
}




// const ping_controller = (req, res) => {
//     // console.log(req.body)
//     exec(`ping ${req.body.ip} -c 5 `, (err, stdout, stderr) => {
//         console.log("ping ", req.body.ip)
//         if (err) {
//             console.log('A')
//             console.log(`error: ${err}`);
//             res.status(400).send(`${req.body.ip} is not reachable`)
//         }
//         else if (stderr) {
//             console.log('B')
//             console.log(`stderr: ${stderr}`);
//             res.status(200).send(stderr)
//         }
//         else {
//             console.log('C')
//             console.log(`stdout: ${stdout}`);
//             res.status(200).send(stdout)
//         }
//     })
// }

