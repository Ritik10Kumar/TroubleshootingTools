const express = require("express");

const troubleshootRoute = require('./troubleshoot_cmd.route')



const router = express.Router();

const defaultRoutes = [
  
  {
    path: "/troubleshoot",
    route: troubleshootRoute,
  }  
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
