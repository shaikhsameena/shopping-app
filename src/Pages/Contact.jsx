import React, { useRef, useState } from "react";
import "./Contact.css";
import {
  FaUser, FaEnvelope, FaRegCommentDots,
  FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt
} from "react-icons/fa";


const Contact = () => {
  const formRef = useRef();
  const [popup, setPopup] = useState({ show: false, msg: "" });
  const [sending, setSending] = useState(false);

  const showPopup = (msg, ms = 5000) => {
    setPopup({ show: true, msg });
    setTimeout(() => setPopup({ show: false, msg: "" }), ms);
  };
  const hidePopup = () => setPopup({ show: false, msg: "" });

  const sendDirect = (e) => {
    e.preventDefault();
    if (sending) return;

    const fd = new FormData(formRef.current);
    const name = (fd.get("user_name") || "").toString().trim();
    const email = (fd.get("user_email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();
    const website = (fd.get("website") || "").toString().trim();

    if (website) return;
    if (!name || !email || !message) {
      showPopup("⚠️ Required entries to be filled");
      return;
    }

    const submission = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    const stored = localStorage.getItem("contactMessages");
    const messages = stored ? JSON.parse(stored) : [];
    messages.push(submission);
    localStorage.setItem("contactMessages", JSON.stringify(messages, null, 2));

    const blob = new Blob([JSON.stringify(submission, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `contact-message-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSending(true);
    setTimeout(() => {
      showPopup("✅ Message saved to local storage and downloaded as JSON.");
      formRef.current.reset();
      setSending(false);
    }, 500);
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
       
        <div className="contact-form">
          <h2>Send us a Message</h2>

          <form ref={formRef} onSubmit={sendDirect}>
            <input
              type="text"
              name="website"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="input-group">
              <span><FaUser /></span>
              <input type="text" name="user_name" placeholder="Your Name" />
            </div>

            <div className="input-group">
              <span><FaEnvelope /></span>
              <input type="email" name="user_email" placeholder="Your Email" />
            </div>

            <div className="input-group textarea">
              <span><FaRegCommentDots /></span>
              <textarea name="message" placeholder="Write your message..." />
            </div>

            <button
              className="send-btn"
              type="submit"
              disabled={sending}
              aria-busy={sending ? "true" : "false"}
            >
              {sending ? "Sending..." : "Send Message 🚀"}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Reach Us</h2>
          <p>We’d love to hear from you! ❤️</p>
          <p>📍 Ameerpet, hyderabad, Telangana, India</p>
          <p>📧 shaikhsameena995@gmail.com</p>

          <p className="phone">
            <FaPhoneAlt className="phone-icon" />
            <span>+91 8310746852</span>
          </p>

          <div className="social-links">
            <a href="#"><FaFacebook /> Facebook</a>
            <a href="https://www.instagram.com"><FaInstagram /> Instagram</a>
            <a href="https://wa.me/918310746852" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>

          <div className="thankyou-box">
            <p>🙏 Thank you for visiting!</p>
            <h3>— shopify Team</h3>
          </div>
        </div>
      </div>

      {popup.show && (
        <div
          className="popup-overlay"
          role="dialog"
          aria-modal="true"
          onClick={hidePopup}
        >
          <div
            className="popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-icon">✅</div>
            <div className="popup-text">{popup.msg}</div>
            <button className="popup-btn" onClick={hidePopup} autoFocus>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
