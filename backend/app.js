const express = require('express');
const mongoose = require('mongoose');
const bannerRoute = require('./routes/bannerRoutes'); // Import the banner routes
const cors = require("cors");
require('dotenv').config();
const bodyParser = require("body-parser");
const checkAndAddDefaultCategories = require('./data');
const checkAndAddDefaultProducts = require('./menudata');
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));
// Register the routes
app.use('/api', bannerRoute);
app.use('/api', require("./routes/categoryRoute"));
app.use('/api', require("./routes/menuRoute"));
app.use('/api', require("./routes/sendEmail"));

// Connect to MongoDB (replace with your own URI)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
   
    checkAndAddDefaultCategories();
    checkAndAddDefaultProducts()
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
