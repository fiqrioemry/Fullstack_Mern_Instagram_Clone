require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`✅ Connected to MySQL on ${DB_HOST}`);
  })
  .catch((err) => {
    console.error('❌ MySQL connection error:', err);
  });

module.exports = sequelize;
