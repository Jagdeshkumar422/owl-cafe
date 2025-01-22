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
  });
  const [image, setImage] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Fetch all menu items and categories from the backend
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href ="/login"; // Redirect to login if not authenticated
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
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setNewProduct((prev) => ({ ...prev, category: selectedCategories }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('shortdesc', newProduct.shortdesc);
    formData.append('longdescription', newProduct.longdescription);
    formData.append('price', newProduct.price);
    formData.append('category', JSON.stringify(newProduct.category));
    formData.append('img', image);

    try {
      const response = await axios.post(`${APP_CONFIG.backendUrl}api/addmenu`, formData);
      alert(response.data.message);
      setIsAddFormVisible(false); // Close the form after successful submission
      fetchMenus(); // Reload menus after adding a new one
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  const handleDelete = async (menuId) => {
    console.log(menuId)
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await axios.delete(`${APP_CONFIG.backendUrl}api/deletemenu/${menuId}`);
        alert('Menu item deleted successfully');
        setMenus(menus.filter((menu) => menu.id !== menuId)); // Remove from state
      } catch (error) {
        console.error('Error deleting menu:', error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="header">
        <h2>Menu List</h2>
        <button className="addButton" onClick={() => setIsAddFormVisible(true)}>
          Add
        </button>
      </div>

      {/* Displaying the list of existing menu items */}
      <div className="menuList">
        {menus.map((menu) => (
          <div key={menu.id} className="menuItem">
            <img src={menu.img} alt={menu.name} className="menuImage" />
            <div className="menuDetails">
              <h3 className="menuDetailsHeading">{menu.name}</h3>
              <p className="menuDetailsText">{menu.shortdesc}</p>
              <p className="menuDetailsText">Price: ${menu.price}</p>
              <p className="menuDetailsText">Rating: {menu.rating}</p>
            </div>
            <button
    className="deleteButton"
    onClick={() => handleDelete(menu._id)}
  >
    <i className="deleteIcon">×</i> {/* Using × for the icon */}
  </button>
          </div>
        ))}
      </div>

      {/* Add Menu Form */}
      {isAddFormVisible && (
        <div className="formContainer">
          <h3 className="formHeading">Add New Menu</h3>
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
                required
              />
            </div>
            <button className="submitButton" type="submit">
              Add Product
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
