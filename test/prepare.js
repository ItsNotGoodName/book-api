before(() => {
    const path = require('path')
    return new Promise((resolve, reject) => {
        require('dotenv').config({
            path: path.resolve(process.cwd(), 'test.env')
        });
        const db = require('../src/config/db').connection;
        db.once('open', () => {
            resolve();
        });
        db.on('error', (e) => {
            reject(e);
        });
    });
});

after(() => {
    return new Promise((resolve, reject) => {
        const db = require('../src/config/db').connection;
        db.close()
            .then(() => {
                resolve()
            });
    });
});