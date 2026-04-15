import React from 'react';
import './Testimonials.css';


import vikramAvatar from '../assets/vikram.jpg';
import priyaAvatar from '../assets/priya.jpg';
import ravindraAvatar from '../assets/ravindra.jpg';

const testimonials = [
  {
    avatar: vikramAvatar,
    text: "This shirt has a great fit and classy look — perfect for office wear. The fabric quality is excellent, and it didn’t shrink after washing.",
    name: "Vikram Mehta",
    location: "Ahmedabad, India",
  },
  {
    avatar: priyaAvatar,
    text: "This dress fits perfectly and feels so soft on the skin — stylish yet very comfortable. Delivery was quick, and the quality exceeded my expectations",
    location: "karnataka, India",
  },
  {
    avatar: ravindraAvatar,
    text: "I was impressed with how soft and breathable this fabric is — perfect for hot weather. It feels comfortable even after wearing it for long hours.",
    name: "Ravindra Kulkarni",
    location: "Gujarat, India",
  },
];

const Testimonials = () => (
  <section id="testimonials">
    <h2 className="section-heading">What Our Customers Say</h2>
    <div className="testimonial-grid">
      {testimonials.map((review, idx) => (
        <div className="testimonial-card-modern" key={idx}>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p className="review-text">{review.text}</p>
          <div className="reviewer-info">
            <div className="avatar">
              {review.avatar ? (
                <img src={review.avatar} alt={review.name} />
              ) : (
                <i className="fas fa-user-circle"></i>
              )}
            </div>
            <div>
              <p className="reviewer-name">{review.name}</p>
              <p className="reviewer-location">{review.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
