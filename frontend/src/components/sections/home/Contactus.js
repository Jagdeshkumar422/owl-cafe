import React, { useState } from "react";
import axios from "axios";
import { APP_CONFIG } from "../../../config";
import './contact.css';  // Import the CSS file for styling

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    dateTime: "",
    totalPax: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${APP_CONFIG.backendUrl}api/booking`, formData);
      alert("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contactus-container">
      <h2 className="contactus-heading">Make a Booking</h2>
      <form className="contactus-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Total PAX (Persons):</label>
          <input
            type="number"
            name="totalPax"
            value={formData.totalPax}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn-custom primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
};

export default Contactus;
