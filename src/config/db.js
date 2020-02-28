const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    resolve => {
        console.log("DB connected");
    },
    reject => {
        console.log("Can't connect to DB");
    }
)

module.exports = mongoose;