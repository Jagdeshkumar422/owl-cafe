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
      return res.json("not data found");
    }
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// Add a new category
router.post('/categories', upload.single('img'), async (req, res) => {
  const { title, shortdesc } = req.body;
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

// Update a category
router.put('/categories/:id', upload.single('img'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortdesc } = req.body;
    const file = req.file;

    // Find the category to update
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    let imageUrl = category.img; // Keep the current image URL if no new image is uploaded

    if (file) {
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

      // Upload the new image if there is one
      const uploadResult = await streamUpload(file.buffer);
      imageUrl = uploadResult.secure_url; // Update the image URL with the new image
    }

    // Update the category in the database
    category.title = title;
    category.shortdesc = shortdesc;
    category.img = imageUrl;

    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error in /categories/:id route:', error);
    res.status(500).json({ message: 'Error updating category', error });
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
