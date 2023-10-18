// TROUBLE SHOOTING COMMANDS

// const { exec } = require('node:child_process');
// // const { spawn } = require('child_process');
const { exec } = require('child_process');



const ping_controller = (req, res) => {

    const pingProcess = exec(`ping ${req.body.ip}`);
    let output = '';
    pingProcess.stdout.on('data', (data) => {
        output = data;
    });


    pingProcess.on('exit', (code) => {
        if (code === 0) {
            res.status(200).send(output)
        } else {
            res.status(500).send(`${req.body.ip} is not reachable`)
        }
    });
}


const ipconfig_controller = (req, res) => {

    const ipconfigProcess = exec('ipconfig');
    let output = '';
    ipconfigProcess.stdout.on('data', (data) => {
        output += data;
    });


    ipconfigProcess.on('exit', (code) => {
        if (code === 0) {
            res.status(200).send(output)
        } else {
            res.status(500).send('command is not reachable')
        }
    });
}

const netstat_controller = (req, res) => {

    const netstatProcess = exec('netstat');
    let output = '';
    netstatProcess.stdout.on('data', (data) => {
        output += data;
    });


    netstatProcess.on('exit', (code) => {
        if (code === 0) {
            res.status(200).send(output)
        } else {
            res.status(500).send('command is not reachable')
        }
    });
}


const nslookup_controller = (req, res) => {
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




const tracepath_controller = (req, res) => {
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
    console.log(req.body)
    exec(`telnet ${req.body.ip} ${req.body.port} `, (err, stdout, stderr) => {
        console.log("yaha aa gye h hum")
        if (err) {
            console.log('A')
            console.log(`error: ${err.message}`);
            res.status(200).send(`telnet: Unable to connect to remote host (${req.body.ip} ${req.body.port}): Connection refused`)
        }
        else if (stderr) {
            console.log('B')
            console.log(`stderr: ${stderr}`);
            res.status(200).send(stderr)
        }

        else {
            console.log('C')
            console.log(`stdout: ${stdout}`);
            res.status(200).send(stdout)
        }

    })
}

const udp_controller = (req, res) => {
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

const nmap_controller = (req, res) => {
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









module.exports = {
    ping_controller, //done     ON FROINTEND
    ipconfig_controller, //done   ON FRONTEND
    netstat_controller, //done       
    nslookup_controller, //done       ON FRONTEND
    tracepath_controller, //done       ON FRONTEND
    nmap_controller, //                 ON FRONTEND
    udp_controller,//                     ON FRONTEND not use in Windows
    telnet_controller, // not in nuse       need add autotime out to exit command
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

