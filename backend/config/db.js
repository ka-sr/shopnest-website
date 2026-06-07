const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.DATABASE_URL || process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('Error: MongoDB connection string is not set. Set MONGO_URI, DATABASE_URL, or MONGODB_URI in environment variables.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
