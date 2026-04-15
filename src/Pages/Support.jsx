import React from 'react';
import './Support.css';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (document.referrer !== '') {
      window.history.back();
    } else {
      navigate('/products');
    }
  };

 
  const SUPPORT_EMAIL = "shaikhsameena995@gmail.com";
  const DEFAULT_SUBJECT = " Support Request";
  const DEFAULT_BODY =
    `Hello ,%0D%0A%0D%0A` +
    `I need help with: [order/product/returns].%0D%0A` +
    `Order ID (if any): %0D%0A` +
    `Phone (optional): %0D%0A%0D%0A` +
    `Thanks,%0D%0A`;

  const buildGmailUrl = (to, subject, body) =>
    `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${body}`;

  const buildMailtoUrl = (to, subject, body) =>
    `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${body}`;

  const handleEmailClick = (e) => {
    e.preventDefault();

    const gmailUrl = buildGmailUrl(SUPPORT_EMAIL, DEFAULT_SUBJECT, DEFAULT_BODY);
    const mailtoUrl = buildMailtoUrl(SUPPORT_EMAIL, DEFAULT_SUBJECT, DEFAULT_BODY);

    const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    const fallbackTimer = setTimeout(() => {
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = mailtoUrl;
      }
    }, 800);

    if (win) {
      const checkClosed = setInterval(() => {
        if (win.closed) {
          clearInterval(checkClosed);
          clearTimeout(fallbackTimer);
        }
      }, 1000);
    }
  };

  return (
    <section className="support-section" aria-labelledby="supportTitle">
      <div className="support-container">
        <h2 id="supportTitle" className="section-title">Need Help? We're Here for You!</h2>
        <p className="support-description">
          Our support team is ready to assist you with any questions, concerns, or issues. Reach out to us anytime!
        </p>

        <div className="support-options" role="list">
          
          <div className="support-option" role="listitem">
            <i className="fas fa-headset" aria-hidden="true"></i>
            <h3>Customer Service</h3>
            <p>Contact our customer support team for product queries, order tracking, or returns.</p>
            <button
              type="button"
              onClick={handleEmailClick}
              className="support-btn"
              aria-label="Email support (opens Gmail or your email app)"
            >
              Email Us
            </button>
          </div>

         
<div className="support-option" role="listitem">
  <i className="fas fa-comments" aria-hidden="true"></i>
  <h3>Live Chat (WhatsApp)</h3>
  <p>Need quick help? Start a WhatsApp chat with one of our agents now.</p>
  <a
    href="https://wa.me/918310746852?text=Hello%20shopify%20Team%2C%20I%20need%20support."
    target="_blank"
    rel="noopener noreferrer"
    className="support-btn"
    aria-label="Start WhatsApp chat with us"
  >
    Chat Now
  </a>
</div>


         
          <div className="support-option" role="listitem">
            <i className="fas fa-phone-alt" aria-hidden="true"></i>
            <h3>Call Us</h3>
            <p>Prefer speaking to someone? Give us a call and we’ll be happy to assist you.</p>
            <a href="tel:+918310746852" className="support-btn" aria-label="Call  support">
              Call Now
            </a>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={goBack} className="nav-btn" aria-label="Go back">← Back</button>
        <button onClick={() => navigate('/contact')} className="nav-btn" aria-label="Go to contact page">Next →</button>
      </div>
    </section>
  );
};

export default Support;
