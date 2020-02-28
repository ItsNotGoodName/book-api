const fs = require('fs');

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return file !== __filename && file.endsWith('.js');
    })
    .forEach((file) => {
        let model = require('./' + file);
        module.exports[file.substr(0, file.length - 3)] = model;
    });