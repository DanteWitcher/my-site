const mongoose = require('mongoose');

const messages = new mongoose.Schema({
    name: String,
    email: String,
    ip: String,
    text: String,
    date: { type: Date, default: Date.now() },
});

const message = mongoose.model('message', messages);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emails', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function connectDb(data) {
    console.log("db is opening, yeee");
    const db = mongoose.connection.db;
    console.log(db.databaseName);

    return new message({
        name: data.name,
        email: data.email, //req.body.email,
        ip: data.ip, //req.ip,
        text: data.message, //req.body.message,
        date: new Date()
    }).save();
}

module.exports = connectDb;
