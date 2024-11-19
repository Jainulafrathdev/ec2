const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://ec2-54-211-228-203.compute-1.amazonaws.com:27017/profileDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;


//mongodb+srv://umar:umar444@authentication-app.ted5m.mongodb.net/authdb?retryWrites=true&w=majority

//mongodb://mongo-db/ShariaStock