require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.DB_URL;

const connectDB = async() => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connect to MongoDB');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;