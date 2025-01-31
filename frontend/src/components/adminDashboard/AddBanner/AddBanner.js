import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import { Redirect } from "react-router-dom";
import { APP_CONFIG } from '../../../config';
import "./addbanner.css"

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
        const response = await axios.get(`${APP_CONFIG.backendUrl}api/banner`);
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
      const response = await axios.post(`${APP_CONFIG.backendUrl}api/banner`, formData, {
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
      <div className="header">
          <h2>Manage Banner</h2>
          <button
            className="add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Update Banner
          </button>
        </div>
        {bannerUrl && <img src={bannerUrl} alt="Banner" width="100%" style={{ marginBottom: '20px' }} />}

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
              <h2 style={{color: "#2c3e50", fontSize: "20px"}}>Upload New Banner</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              <form onSubmit={handleSubmit}>
                <p style={{color: "#2c3e50"}}>Image must be 1200 x 500 px</p>
                <input type="file" name="file" onChange={handleFileChange}  style={{color: "#2c3e50"}}/>
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
