const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongo_url, { useNewUrlParser: true });
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;