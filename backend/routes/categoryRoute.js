const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { config } = require('dotenv');
const Category = require('../models/categoryModel'); // Assuming you have a Category model

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

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
        // Provide a default response instead of a 404
        return res.json("not data found");
      }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// Add a new category
router.post('/categories', upload.single('img'), async (req, res) => {
  const { title, shortdesc } = req.body; // Extract fields from the request body
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No image uploaded.' });
  }

  try {
    const streamUpload = (fileBuffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'categories' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(fileBuffer);
      });

    // Upload image to Cloudinary
    const uploadResult = await streamUpload(file.buffer);

    // Save category to MongoDB
    const newCategory = new Category({
      title,
      shortdesc,
      img: uploadResult.secure_url, // Save the Cloudinary URL
    });
    await newCategory.save();

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error in /categories route:', error);
    res.status(500).json({ message: 'Error adding category', error });
  }
});

// Delete a category
router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
});

module.exports = router;
