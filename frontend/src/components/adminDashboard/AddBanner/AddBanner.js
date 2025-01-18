import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Redirect } from "react-router-dom";

const AddBanner = () => {
  const [bannerUrl, setBannerUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  

  // Fetch the current banner
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href ="/login"; // Redirect to login if not authenticated
    }
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/banner');
        setBannerUrl(response.data.imgUrl); // Ensure the response contains `imgUrl`
      } catch (err) {
        console.error('Error fetching banner:', err);
        setError(err.response?.data?.message || 'Error fetching banner');
      }
    };

    fetchBanner();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5002/api/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBannerUrl(response.data.imgUrl); // Update banner URL
      setSuccessMessage('Banner updated successfully!');
      setError(null);
      setIsModalOpen(false); // Close the modal on success
    } catch (err) {
      console.error('Error updating banner:', err);
      setError(err.response?.data?.message || 'Error updating banner');
      setSuccessMessage('');
    }
  };

  return (
    <AdminLayout>
      <div style={{ position: 'relative' }}>
        <h1>Banner Management</h1>
        {bannerUrl && <img src={bannerUrl} alt="Banner" width="100%" style={{ marginBottom: '20px' }} />}
        <button
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Update Banner
        </button>

        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                width: '400px',
                position: 'relative',
              }}
            >
              <h2>Upload New Banner</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={handleFileChange} />
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                    Upload
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

export default AddBanner;
