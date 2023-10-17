const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const mongoose = require('mongoose');
const cron = require('node-cron');


const { Client } = require("pg")
const dotenv = require("dotenv")
const moment = require("moment/moment");
const date = require('date-and-time');
var fs = require('fs');
dotenv.config()



let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {

  logger.info(`Connected to MongoDB ${new Date()}`);
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}  ${new Date()}`);
  });
  
});

// const connectDb = async () => {
//   try {
//     const client = new Client({
//       user: process.env.PGUSER,
//       host: process.env.PGHOST,
//       database: process.env.PGDATABASE,
//       password: process.env.PGPASSWORD,
//       port: process.env.PGPORT
//     })

//     await client.connect()
//     // const res = await client.query('SELECT * FROM some_table')
//     // console.log(res)
//     console.log("<><><> postgres <><><>", client)
//     await client.end()
//   } catch (error) {
//     console.log(error)
//   }
// }
// connectDb()

// console.log("<><>indexpool<><>", pool);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
