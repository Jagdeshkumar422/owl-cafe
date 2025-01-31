import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import './addmenu.css'; // Import the CSS file
import { APP_CONFIG } from '../../../config';

const AddMenu = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    shortdesc: '',
    longdescription: '',
    price: '',
    category: [],
    img: '', // Add img to the newProduct state
  });
  const [image, setImage] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Fetch all menu items and categories from the backend
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login"; // Redirect to login if not authenticated
    }
    fetchMenus();
    fetchCategories();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${APP_CONFIG.backendUrl}api/menus`);
      setMenus(response.data);
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${APP_CONFIG.backendUrl}api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0]); // Update image state when user selects a new image
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewProduct((prev) => ({ ...prev, category: selectedCategories }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading when the form is submitted

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('shortdesc', newProduct.shortdesc);
    formData.append('longdescription', newProduct.longdescription);
    formData.append('price', newProduct.price);
    formData.append('category', JSON.stringify(newProduct.category));

    // Only append the new image if it's selected
    if (image) {
      formData.append('img', image);
    } else if (newProduct.img) {
      formData.append('img', newProduct.img); // Ensure that the existing image URL is sent if no new image is provided
    }

    try {
      let response;
      if (isEditing) {
        // Update menu item with the new data
        response = await axios.put(`${APP_CONFIG.backendUrl}api/menus/${currentProductId}`, formData);
        alert('Menu item updated successfully');
      } else {
        // Add a new menu item
        response = await axios.post(`${APP_CONFIG.backendUrl}api/addmenu`, formData);
        alert(response.data.message);
      }

      setIsAddFormVisible(false); // Close the form after successful submission
      fetchMenus(); // Reload menus after adding or updating
      setIsEditing(false); // Reset editing state
      setCurrentProductId(null); // Clear the product ID
    } catch (error) {
      console.error('Error submitting menu:', error);
    } finally {
      setIsLoading(false); // Stop loading after submission is complete
    }
  };

  const handleEdit = (menuId) => {
    const menuToEdit = menus.find((menu) => menu._id === menuId);
    setNewProduct({
      name: menuToEdit.name,
      shortdesc: menuToEdit.shortdesc,
      longdescription: menuToEdit.longdescription,
      price: menuToEdit.price,
      category: menuToEdit.category.map((cat) => cat._id),
      img: menuToEdit.img, // Set the existing image URL
    });
    setImage(null); // Reset image input since the image URL is pre-filled
    setIsEditing(true); // Set editing mode
    setCurrentProductId(menuId); // Set the current product ID
    setIsAddFormVisible(true); // Show the form
  };

  const handleDelete = async (menuId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`${APP_CONFIG.backendUrl}api/deletemenu/${menuId}`);
        alert('Menu item deleted successfully');
        setMenus(menus.filter((menu) => menu._id !== menuId)); // Remove from state
      } catch (error) {
        console.error('Error deleting menu:', error);
      }
    }
  };

  const handleAddMenu = () => {
    // Reset form when opening the "Add Menu" form
    setNewProduct({
      name: '',
      shortdesc: '',
      longdescription: '',
      price: '',
      category: [],
      img: '', // Reset the image
    });
    setImage(null); // Clear image
    setIsEditing(false); // Ensure we're not in editing mode
    setIsAddFormVisible(true); // Show the form
  };

  return (
    <AdminLayout>
      <div className="header">
        <h2>Menu List</h2>
        <button className="addButton" onClick={handleAddMenu}>
          {isEditing ? 'Edit Menu' : 'Add Menu'}
        </button>
      </div>

      {/* Displaying the list of existing menu items */}
      <div className="menuList">
        {menus.map((menu) => (
          <div key={menu._id} className="menuItem">
            <img src={menu.img} alt={menu.name} className="menuImage" />
            <div className="menuDetails">
              <h3 className="menuDetailsHeading">{menu.name}</h3>
              <p className="menuDetailsText">{menu.shortdesc}</p>
              <p className="menuDetailsText">Price: AED {menu.price}</p>
              <p className="menuDetailsText">Rating: {menu.rating}</p>
            </div>
            <button
              className="deleteButton"
              onClick={() => handleDelete(menu._id)}
            >
              <i className="bx bx-trash"></i>
            </button>
            <button
              className="editButton"
              onClick={() => handleEdit(menu._id)}
            >
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Add or Edit Menu Form */}
      {isAddFormVisible && (
        <div className="formContainer">
          <h3 className="formHeading">{isEditing ? 'Edit Menu' : 'Add New Menu'}</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                className="inputField"
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Short Description</label>
              <input
                className="inputField"
                type="text"
                name="shortdesc"
                value={newProduct.shortdesc}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Long Description</label>
              <textarea
                className="textareaField"
                name="longdescription"
                value={newProduct.longdescription}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                className="inputField"
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Category</label>
              <select
                className="selectField"
                multiple
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Image</label>
              <input
                className="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {isEditing && newProduct.img && (
                <div>
                  <img
                    src={newProduct.img}
                    alt="Current image"
                    style={{ width: '150px', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>
            <button className="submitButton" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : isEditing ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              className="closeButton"
              onClick={() => setIsAddFormVisible(false)}
            >
              ×
            </button>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};

export default AddMenu;
