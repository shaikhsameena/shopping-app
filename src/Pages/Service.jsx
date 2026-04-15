import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'; // Optional if you move styles

const Service = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Equivalent to history.back()
  };

  return (
    <div>
      <section id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-shipping-fast"></i>
            <h3>Fast Delivery</h3>
            <p>Get your order delivered to your doorstep within 2-3 business days across the country.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Have a question or need help? Our support team is available round-the-clock for you.</p>
          </div>
          <div className="service-card">
            <i className="fas fa-undo-alt"></i>
            <h3>Easy Returns</h3>
            <p>Not satisfied? Return the product hassle-free within 7 days with full refund guaranteed.</p>
          </div>
        </div>
      </section>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={goBack} className="back-btn">← Back</button>
        <button onClick={() => navigate('/product')} className="nav-btn">Next →</button>
      </div>
    </div>
  );
};

export default Service;
