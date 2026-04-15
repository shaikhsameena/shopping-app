import React from 'react';
import './Home.css';
import HeroSection from '../Components/HeroSection.jsx';
import Testimonials from '../Components/Testimonials.jsx';

import UserFeedback from '../Components/UserFeedback.jsx';
import ExploreShop from '../Components/ExploreShop';
import FAQSection from '../Components/FAQSection';












import InfoCards from '../Components/InfoCards.jsx';


const HomePage = () => {
  return (
    <>
    
      <HeroSection />
      <Testimonials /> 
      <UserFeedback /> 
       <ExploreShop />
          {/* Moved just below HeroSection */}
      <InfoCards />
      
       <FAQSection />
       
       
     


     
    </>
  );
};

export default HomePage;