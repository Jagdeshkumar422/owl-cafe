const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { config } = require('dotenv');

const Banner = require('../models/bannerModel'); // Assuming you have a Banner model

// Load environment variables
config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcwc3ehp3",
  api_key: "283419252513685",
  api_secret: "gGz5YtguIm-W42mabvpOsSSF_7c",
});

const router = express.Router();

// Initialize multer for file uploads
const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage: storage });

// Get current banner image
router.get('/banner', async (req, res) => {
  try {
    const banner = await Banner.findOne(); // Retrieve banner from DB
    if (!banner) {
      // Provide a default response instead of a 404
      return res.json({ imgUrl: 'https://graphicsfamily.com/wp-content/uploads/2020/11/Professional-Web-Banner-AD-in-Photoshop-1536x864.jpg' });
    }
    res.json(banner); // Return the current banner URL
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banner', error });
  }
});


// Upload or update banner image
router.post('/banner', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const streamUpload = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'banners' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });

    // Upload to Cloudinary
    const uploadResult = await streamUpload(file.buffer);

    // Update or create a banner in MongoDB
    const existingBanner = await Banner.findOne();
    if (existingBanner) {
      existingBanner.imgUrl = uploadResult.secure_url;
      await existingBanner.save();
    } else {
      await Banner.create({ imgUrl: uploadResult.secure_url });
    }

    res.json({ imgUrl: uploadResult.secure_url });
  } catch (error) {
    console.error('Error in /banner route:', error);
    res.status(500).json({ message: 'Error uploading banner', error });
  }
});



module.exports = router;
