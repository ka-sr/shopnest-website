const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri ="mongodb+srv://kamal:kamal12345@cluster0.anr22tk.mongodb.net/?appName=Cluster0";

  if (!mongoUri) {
    console.error('Error: MongoDB connection string is not set. Set MONGO_URI, DATABASE_URL, MONGODB_URI, MONGO_URL, MONGODB_URL, or ATLAS_URI in environment variables.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect("mongodb+srv://kamal:kamal12345@cluster0.anr22tk.mongodb.net/?appName=Cluster0", {
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
