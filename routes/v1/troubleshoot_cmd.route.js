const express = require('express');
const troubleshootController = require('../../controller/troubleshoot_cmd.controller');

const router = express.Router();
router.route('/ping').post(troubleshootController.ping_controller);
router.route('/nmap').post(troubleshootController.nmap_controller);
router.route('/tracepath').post(troubleshootController.tracepath_controller);
router.route('/traceroute').post(troubleshootController.traceroute_controller);
router.route('/telnet').post(troubleshootController.telnet_controller);
router.route('/udp').post(troubleshootController.udp_controller);
router.route('/nslookup').post(troubleshootController.nslookup_controller);
router.route('/ipconfig').get(troubleshootController.ipconfig_controller);
router.route('/netstat').get(troubleshootController.netstat_controller);
router.route('/mailer').get(troubleshootController.mail_controller);

module.exports = router;