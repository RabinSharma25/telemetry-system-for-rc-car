// config.js
const logger = require('../utils/logger'); // Import your logger configuration
const fs = require('fs');
const yaml = require('js-yaml');

// Load the YAML file
const configFile = __dirname+'/app.yaml'; // Replace with the path to your YAML file

try {
  const config = yaml.load(fs.readFileSync(configFile, 'utf8'));
  module.exports = config;
} catch (error) {
  console.error('Error loading the YAML configuration:', error);
  process.exit(1);
}