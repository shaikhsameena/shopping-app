import React, { useRef, useState } from "react";
import "./Contact.css";
import {
  FaUser, FaEnvelope, FaRegCommentDots,
  FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt
} from "react-icons/fa";

const RECEIVER_EMAIL = "shaikhsameena995@gmail.com";

const ACCESS_KEY =
  import.meta?.env?.VITE_8310746852_ACCESS_KEY ||
  "a56e3c3e-ea70-4a7e-a06b-0b9753d4f4e8";

const isUUID = (k) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    k
  );

const Contact = () => {
  const formRef = useRef();
  const [popup, setPopup] = useState({ show: false, msg: "" });
  const [sending, setSending] = useState(false);

  const showPopup = (msg, ms = 5000) => {
    setPopup({ show: true, msg });
    setTimeout(() => setPopup({ show: false, msg: "" }), ms);
  };
  const hidePopup = () => setPopup({ show: false, msg: "" });

  const buildSubject = (name, email) =>
    ` Contact: ${name} (${email})`;

 
  const buildBody = (name, email, message) => 
`Hi  Support,

Here is what i need help with, 

Message Body :
${message}

Here is my contact 

Name : ${name}
Email : ${email}


Thanks,
 Support.`;

  const sendDirect = async (e) => {
    e.preventDefault();
    if (sending) return;

    if (!isUUID(ACCESS_KEY)) {
      showPopup("❌ Invalid Web3Forms Access Key.");
      return;
    }

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

    fd.set("access_key", ACCESS_KEY);
    fd.set("to", RECEIVER_EMAIL);
    fd.set("from_name", " Contact Form");
    fd.set("subject", buildSubject(name, email));
    fd.set("message", buildBody(name, email, message));
    fd.set("name", name);
    fd.set("email", email);
    fd.set("replyto", email);
    if (!fd.has("botcheck")) fd.set("botcheck", "");

    setSending(true);
    try {
      const res = await fetch("shaikhsameena995@gmail.com", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (data.success) {
        showPopup(" Massage has been sent,  helpdesk will reach out to you soon !");
        formRef.current.reset();
      } else {
        console.error("Web3Forms error:", data);
        showPopup(`❌ Could not send: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Web3Forms send error:", err);
      showPopup("❌ Could not send message. Please try again later.");
    } finally {
      setSending(false);
    }
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
            <a href="https://www.instagram.com/shaik_ayra01/"><FaInstagram /> Instagram</a>
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
