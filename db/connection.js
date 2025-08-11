const mongoose = require('mongoose');

// MongoDB connection URI
const remoteURI = 'mongodb+srv://singcl:singcl@imcoco-api-cluster.7g4ea51.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=imcoco-api-cluster';
const uri = process.env.MONGODB_URI || remoteURI;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB via Mongoose');
});

module.exports = mongoose;