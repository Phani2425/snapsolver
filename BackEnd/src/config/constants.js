require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8900,
  ENV: process.env.NODE_ENV || 'dev',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY
};