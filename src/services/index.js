const fs = require('fs');
const models = require('../models');

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return file !== __filename && file.endsWith('Service.js');
    })
    .forEach((file) => {
        const Service = require('./' + file);
        module.exports[file.substr(0, file.length - 3)] = new Service(models);
    });