import React from 'react';
import "./addtocard.css";
import { useNavigate } from 'react-router-dom';

const Buy = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (document.referrer !== '') {
      window.history.back();
    } else {
      navigate('/products');
    }
  };
return(
         <div className='buy-page'>
        <div className="container">
            <div>
            <img src="/images/bbb.jpg" alt="image saree"/>
            </div>
            <div>
                <h1>Product details</h1>
                <span>Size:xs</span><br></br>
                <span>Material type:Rayon</span><br></br>
                <span>Length:Maxi</span><br></br>
                <span>Occasion type:Festive,wedding</span><br></br>
                <span>Sleeve type:half</span><br></br>
                <span>Style:Regular</span><br></br>
                <span>Country of origin:india</span>

            </div>
        </div>
        </div>

    );
};
export default Buy;