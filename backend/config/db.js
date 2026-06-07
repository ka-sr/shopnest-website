const mongoose = require('mongoose');

const connectDB = async () => {
  // Accept many common environment variable names used by hosting providers
  const mongoUri =
    process.env.MONGO_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGODB_URI ||
    process.env.MONGO_URL ||
    process.env.MONGODB_URL ||
    process.env.ATLAS_URI;

  if (!mongoUri) {
    console.error(
      'Error: MongoDB connection string is not set. Set one of: MONGO_URI, DATABASE_URL, MONGODB_URI, MONGO_URL, MONGODB_URL, or ATLAS_URI in environment variables.'
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
