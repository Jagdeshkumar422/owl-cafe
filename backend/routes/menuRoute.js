const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/menuModel');
const Category = require('../models/categoryModel');

// Initialize multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Fetch all menus
router.get('/menus', async (req, res) => {
  try {
    const menus = await Product.find().populate('category');
    res.json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    res.status(500).json({ message: 'Error fetching menus', error });
  }
});

// Add a new menu item
router.post('/addmenu', upload.single('img'), async (req, res) => {
  const { name, shortdesc, longdescription, price, category } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: 'menu-items' },
      (error, result) => {
        if (error) {
          console.error('Error uploading image:', error);
          return res.status(500).json({ message: 'Error uploading image' });
        }

        // Create new product
        const newProduct = new Product({
          name,
          shortdesc,
          longdescription,
          price,
          rating: 0,
          category: JSON.parse(category), // Parse category as array of ObjectId
          img: result.secure_url,
        });

        newProduct.save()
          .then(() => res.status(201).json({ message: 'Product added successfully' }))
          .catch((err) => {
            console.log('Error saving product:', err);
            res.status(500).json({ message: 'Error saving product', error: err });
          });
      }
    );

    uploadResult.end(file.buffer);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Delete a menu item by ID
router.delete('/deletemenu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product has an image URL, delete the image from Cloudinary
    if (product.img) {
      const publicId = product.img.split('/').pop().split('.')[0]; // Extract the public ID from the image URL
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

// Fetch a specific menu item by ID
router.get('/menu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by ID and populate the category field
    const menuItem = await Product.findById(id).populate('category');

    if (!menuItem) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Send the product data as response
    res.json(menuItem);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// Update a menu item by ID
router.put('/menus/:id', upload.single('img'), async (req, res) => {
  const { id } = req.params;
  const { name, shortdesc, longdescription, price, category } = req.body;
  const file = req.file;

  try {
    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If a new image is uploaded, upload it to Cloudinary
    let updatedImage = product.img; // Keep the old image URL by default
    if (file) {
      // Delete the old image from Cloudinary if a new one is uploaded
      if (product.img) {
        const publicId = product.img.split('/').pop().split('.')[0]; // Extract the public ID
        await cloudinary.uploader.destroy(publicId); // Delete the old image from Cloudinary
      }

      // Upload the new image to Cloudinary and await the result
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'menu-items' },
          (error, result) => {
            if (error) {
              reject(new Error('Error uploading image'));
            } else {
              resolve(result.secure_url); // Get the URL of the uploaded image
            }
          }
        ).end(file.buffer); // Send the file buffer to Cloudinary
      });

      updatedImage = uploadResult; // Set the new image URL
    }

    // Update product fields
    product.name = name;
    product.shortdesc = shortdesc;
    product.longdescription = longdescription;
    product.price = price;
    product.category = JSON.parse(category); // Update category (it could be an array)
    product.img = updatedImage; // Update the image URL

    // Save the updated product to the database
    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
});


module.exports = router;
