import { Sequelize, Model, DataTypes } from "sequelize";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../config.json");

const sequelize = new Sequelize(config.sqlDB, config.sqlUser, config.sqlPw, {
  dialect: 'mssql',
  host: config.sqlServer,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

import TICKET_SUBMISSION from  "./models/TICKET_SUBMISSION.js"
sequelize.TICKET_SUBMISSION = TICKET_SUBMISSION(sequelize)

export default sequelize