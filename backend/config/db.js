const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ai_study_dashboard',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL Connected via Sequelize on host ${process.env.DB_HOST || '127.0.0.1'}`);
    
    // Auto-sync for development (creates tables if they don't exist)
    // NOTE: { alter: true } matches table definitions to the models
    await sequelize.sync({ alter: true });
    console.log(`Sequelize models synchronized successfully.`);
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error.message}`);
    // Do not exit process immediately so we can see the error easier initially
    // process.exit(1); 
  }
};

module.exports = { sequelize, connectDB };
