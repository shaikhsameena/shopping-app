import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./FAQSection.css";

const faqs = [
  {
    question: "What is  Shopify?",
    answer: " shopify is an eCommerce platform that offers tech products with support and service."
  },
  {
    question: "How do I place an order?",
    answer: "You can place an order by browsing products, adding them to cart, and proceeding to checkout."
  },
  {
    question: "What is the return policy?",
    answer: "We accept returns within 7 days of delivery. Product must be unused and in original packaging."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team through the Contact page or email us at support@msfort.com."
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* Top Heading Section */}
      <div className="faq-heading-wrapper">
        {/* <p className="faq-top-title">Discover</p> */}
        <h1 className="faq-title">FAQ</h1>
        {/* <p className="faq-subtitle">
          Uncover a universe of exceptional products and unbeatable deals. Shop our ecommerce.
        </p> */}
      </div>

      {/* Accordion FAQ List */}
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span className="faq-text">{item.question}</span>
              <span className="arrow-icon">
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
