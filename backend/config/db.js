const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Node.js querySrv ECONNREFUSED issues on certain networks/VPNs (like FortiGuard/corporate DNS)
if (process.env.NODE_ENV !== 'production') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    console.log('DNS servers configured to public resolvers (8.8.8.8, 1.1.1.1) to prevent querySrv ECONNREFUSED.');
  } catch (err) {
    console.warn('Could not set custom DNS servers:', err.message);
  }
}

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aura_design_studio';
  
  const options = {
    autoIndex: true, // Build indexes in production
    connectTimeoutMS: 10000, // Give up after 10s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  };

  try {
    console.log('Attempting connection to MongoDB database...');
    await mongoose.connect(mongoURI, options);
    console.log('MongoDB connection established successfully.');
  } catch (error) {
    console.error(`MongoDB initial connection failure: ${error.message}`);
    // Do not crash the server in local development or fallback environments
    console.warn('Backend server proceeding. Ensure a local/remote MongoDB instance is operational.');
  }
};

// Monitor connection events
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB runtime connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection lost. Attempting database reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB connection restored.');
});

module.exports = connectDB;
