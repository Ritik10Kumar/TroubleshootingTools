// TROUBLE SHOOTING COMMANDS
const { exec } = require('child_process');
const nodemailer = require('nodemailer');
const config = require('../config/config');
let email = require("../utils/email");





const ping_controller = async (req, res) => {

    exec(`ping ${req.body.ip} -c 5 `, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`);
            res.status(200).send(`${req.body.ip} is not reachable`)
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log(`stdout: ${stderr}`);
            res.status(200).send(stdout)
        }
    })
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
            console.log(`error: ${err.message}`);
            res.status(200).send(`** server can't find ${req.body.ip}.in-addr.arpa: NXDOMAIN`)
        }
        else if (stdout) {
            console.log(`stdout: ${stdout}`);
            res.status(200).send(stdout)
        }

        else {
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }


    })
}




const tracepath_controller = async (req, res) => {
    exec(`tracepath  ${req.body.ip} `, (err, stdout, stderr) => {

        if (err) {
            console.log(`error: ${err.message}`);
            res.status(200).send(err)
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log(`stdout: ${stderr}`);
            res.status(200).send(stdout)
        }
    })
}


const traceroute_controller = async (req, res) => {
    exec(`traceroute  ${req.body.ip} `, (err, stdout, stderr) => {

        if (err) {
            console.log(`error: ${err.message}`);
            res.status(200).send(err)
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log(`stdout: ${stderr}`);
            res.status(200).send(stdout)
        }
    })
}



const telnet_controller = async (req, res) => {
    exec(`telnet ${req.body.ip} ${req.body.port} `, (err, stdout, stderr) => {
        try {
            console.log(`stdout: ${stdout}`);
            res.status(200).send(stdout)
        } catch (error) {
            res.status(200).send(error) 
        }

    })
}

const udp_controller = async (req, res) => {
    exec(`nc -z -v -u ${req.body.ip} ${req.body.port} `, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`);
            res.status(200).send("No Connection Found")
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
            console.log(`stdout: ${stdout}`);
            res.status(200).send(stdout)
        }

    })
}

const nmap_controller = async (req, res) => {
    exec(`nmap -v  ${req.body.ip} `, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`);
            res.status(200).send(err)
        }
        else if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }
        else {
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
    email.sendEmail(mailOptions);
        res.status(250).send({
          message: "mail send",
        });


        
}





module.exports = {
    ping_controller,   
    ipconfig_controller, //windows
    netstat_controller, //windows
    nslookup_controller, 
    traceroute_controller,
    tracepath_controller,
    nmap_controller,
    udp_controller,                    
    telnet_controller, 
    mail_controller, // to send mails
    
}






