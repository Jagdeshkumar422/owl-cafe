import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addcategory.css"; // Add some styles for the layout and modal
import AdminLayout from "../AdminLayout/AdminLayout";
import { APP_CONFIG } from "../../../config";

const AddCategory = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [newCategory, setNewCategory] = useState({ title: "", shortdesc: "" }); // State for new category
  const [image, setImage] = useState(null); // State for the uploaded image file
  const [categoryToEdit, setCategoryToEdit] = useState(null); // State for category to edit
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Fetch categories from backend on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login"; // Redirect to login if not authenticated
    }
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${APP_CONFIG.backendUrl}api/categories`);
      const data = Array.isArray(response.data) ? response.data : []; // Ensure response is an array
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Fallback to empty array if error occurs
    }
  };

  // Function to clear the form state
  const clearForm = () => {
    setNewCategory({ title: "", shortdesc: "" }); // Reset the form fields
    setImage(null); // Reset the image
    setCategoryToEdit(null); // Reset the category being edited
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the uploaded file
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("title", newCategory.title);
    formData.append("shortdesc", newCategory.shortdesc);
    formData.append("img", image);

    try {
      const response = await axios.post(
        `${APP_CONFIG.backendUrl}api/categories`,
        formData
      );
      if (response.status === 201 || response.status === 200) {
        fetchCategories(); // Refresh categories after adding
        setIsModalOpen(false); // Close modal
        clearForm(); // Reset form fields
      } else {
        alert("Failed to add category!");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append("title", newCategory.title);
    formData.append("shortdesc", newCategory.shortdesc);
    if (image) {
      formData.append("img", image); // Only append the image if a new image is selected
    }

    try {
      const response = await axios.put(
        `${APP_CONFIG.backendUrl}api/categories/${categoryToEdit._id}`,
        formData
      );
      if (response.status === 200) {
        fetchCategories(); // Refresh categories after update
        setIsModalOpen(false); // Close modal
        clearForm(); // Reset form fields
      } else {
        alert("Failed to update category!");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDeleteCategory = async (id) => {
    console.log(id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${APP_CONFIG.backendUrl}api/categories/${id}`
      );
      if (response.status === 200) {
        fetchCategories(); // Refresh categories after deletion
      } else {
        alert("Failed to delete category!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category); // Set the category to be edited
    setNewCategory({
      title: category.title,
      shortdesc: category.shortdesc,
    });
    setImage(null); // Optional: Clear image if you're not updating it
    setIsModalOpen(true); // Open the modal
  };

  return (
    <AdminLayout>
      <div className="add-category-page">
        <div className="header">
          <h2>Manage Categories</h2>
          <button
            className="add-btn"
            onClick={() => {
              clearForm(); // Clear the form when opening the Add Category modal
              setIsModalOpen(true);
            }}
          >
            Add New Category
          </button>
        </div>

        {/* Table to display categories */}
        <table className="category-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id || index}>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <img src={category.img} alt={category.title} width="50" />
                </td>
                <td>{category.shortdesc}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-btn"
                    onClick={() => handleEditCategory(category)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for adding/updating category */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3 style={{color:'#2c3e50'}}>{categoryToEdit ? "Update Category" : "Add New Category"}</h3>
              <form onSubmit={categoryToEdit ? handleUpdateCategory : handleAddCategory}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newCategory.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isLoading} // Disable the input during loading
                  />
                  {categoryToEdit && !image && categoryToEdit.img && (
                    <img
                      src={categoryToEdit.img}
                      alt="Current Category"
                      style={{ marginTop: "10px", width: "50px" }}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="shortdesc"
                    value={newCategory.shortdesc}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : categoryToEdit ? "Update Category" : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
