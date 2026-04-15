
import React from "react";
import "./Footer.css";
import GPayLogo from "../assets/Gpay.png"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-left">
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul>
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Warranty</li>
              <li>Our Policies</li>
              <li>Track Orders</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">My Account</h4>
            <ul>
              <li>Sign In</li>
              <li>View Cart</li>
              <li>My Wishlist</li>
              <li>My Orders</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>

       
        <div className="footer-center">
          <p className="footer-slogan">Reliable Care, Right to your Door.</p>
          <div className="footer-line"></div>
        </div>

        
        <div className="footer-right">
          <h4 className="address-title">Registered Office Address</h4>
         
           <strong> MJ AND SRJ TRADING</strong><br/>
            <p className="text">
            NUTAN VASHAT,<br />
            Ameerpet, hyderabad,<br />
            Telangana, India<br />
            8149829233
          </p>
        </div>
      </div>

     
      <div className="footer-bottom">
        <p>© All rights reserved</p>

        <div className="payment-logos">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            width="50"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="Mastercard"
            width="50"
          />
          <img src={GPayLogo} alt="Google Pay" width="50" />
        </div>

 <div className="footer-icons">

  <a
    href="https://www.facebook.com/profile.php?id=61578060466582"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="MSFORT on Facebook"
    title="Facebook"
  >
    <i className="fab fa-facebook-f"></i>
  </a>


  <a
    href="https://x.com/msfort_official"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="MSFORT on X"
    title="X (Twitter)"
  >
    <i className="fab fa-x-twitter"></i>
  </a>


  <a
    href="https://www.instagram.com/msfort_official/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="MSFORT on Instagram"
    title="Instagram"
  >
    <i className="fab fa-instagram"></i>
  </a>
</div>



        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
