import React from 'react';
import Navbar from './Navbar';
import './Contact.css'

function Contact() {
   
  return (
    <div className="contact-page-container">
      <Navbar />
      <div className="contact-details">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out to us using the contact information below:</p>

        <div className="contact-info">
          <h3>Email:</h3>
          <p>support@example.com</p>

          <h3>Phone:</h3>
          <p>+1 (123) 456-7890</p>

          <h3>Address:</h3>
          <p>123 Example Street, Suite 101, City, State, 12345</p>

          <h3>Working Hours:</h3>
          <p>Monday to Friday: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );

  
}

export default Contact;
