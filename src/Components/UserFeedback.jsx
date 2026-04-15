import React, { useEffect, useState } from 'react';
import './UserFeedback.css';

import A from '../assets/A.jpg';
import B from '../assets/bbb.jpg';
import C from '../assets/C.jpg';


const AMAZON_LARGE  = 'https://www.amazon.in/HOSI-Georgette-Printed-Pattern-Sleeves/dp/B0DS1BRY83/ref=sr_1_26_sspa?crid=LJFAXXVLJPIB&dib=eyJ2IjoiMSJ9.VaNCFzqE2nVghmsNyZKr4R2XSlLhN6TckneXEHAZXND2ETCsntr8Md9ec5FZShiMx8YRhlUBlcOrYI5i_KjQSus64u_FbEJkvhOaKqGrVMZdm_JJxBY2Pa7kL2aCC7pWf8-3ZV7mhibXfdMyk9zUWBWCZicBGRM8ucWntH5hCj5nyuv1UuYzOvm3K57-pKJXSSQ29XZwjEnVzYEqRN_C7CP9SwiNSfh9rbooDHrnEjyRUpIin1yhyYtd87NwDCYqUUFqk5fv1ac7Z1fDeMAJ77bX7GGkHv2wXSqDKQ92DjU.14JvEDBChLg2iA2wdo8QETH34Ukhij1N5a-Xj472c0k&dib_tag=se&keywords=women%2Bdress&qid=1760266548&sprefix=women%2Bdress%2Caps%2C427&sr=8-26-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&psc=1';
const AMAZON_SMALL1 = 'https://www.amazon.in/Indian-Garage-Co-Checkered-0620-SH50-10_Navy/dp/B08R7JR1Q8/ref=sr_1_20_sspa?crid=1QI6ZBT81WFV8&dib=eyJ2IjoiMSJ9.HKvd7I4zR_5ry_z9M_d8sFBE_bv9Qo7aw9gzxQoOapzV3QqOCVcVUdqP22M4lY4TZeQGwGzTdH7jveTh7V2ZFFVwPHhmccYf7sCUHqnppYuFQ-Sp-_8uLsPbqMiNazyh3KJ67T3v5KkFSVCPeoyMcW-V8E_VOoezc8W6XHlJaM88zd3Gr-ff31IKkmqYwZPi-jlbN7U6qH7xo08vdDYNm_padCq3A3DAbHtDHsQCkTcR-jb3avQw-XCsXRZ3xjPBm8P1bk1L2JRLyeBXs-_a_dKX5FhxPDcgvAgDxCpcWiU.YnCdEiNskm0nKokf01azGl7io9gmPU9Zevs02di6YIo&dib_tag=se&keywords=mens%2Bcasual%2Bshirts&qid=1760267086&sprefix=men%2Caps%2C345&sr=8-20-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&psc=1';
const AMAZON_SMALL2 = 'https://www.amazon.in/Jelly-Qelly-Jumpsuit-One-Piece-7-8year/dp/B0C9DVWNGW/ref=sr_1_4_sspa?crid=34IKSPX29MNP4&dib=eyJ2IjoiMSJ9.hZcSLh6ETgxM5wtnkeiow5sEjedxrwLZkpkYPRbdEH7oO2oI8Bl8Wlq0EVeTRRFDyRMnVCW_as2WJCfNgyUozZG1xoxOaZoZO_r1Pc0eLGS-vucrzoStntmldSaYr7ghF9MkrDhAGuSB3YKpCzuUOoahOmF6WE40tY5_PKeqUHxnMSLJgpf4FylGDJXQlav6WpEpKRWDJ3ZjAIh1ipE4-_Bho8XWu91wEin9H4LUPhC9Voj92-0yB5aZyHAa9kJwG7u85Dcmd3fFRiWHFzveNTIDTSxSHZOKngzHBTO_sSI.NpbBGrWYwf3bc1iLAhRfYd9ecR6vm1ZVDixrxHmQmCs&dib_tag=se&keywords=kid%2Bgirl%2Bdress&qid=1760267587&sprefix=kid%2Bgirl%2B%2Caps%2C454&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1';


const RotatingText = ({ items = [], interval = 3000, className = '' }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items, interval]);
  return <span className={className}>{items[idx] ?? ''}</span>;
};

const UserFeedback = () => {
  const largeTitles = ['On Sale', 'Limited Time Offer', 'Today’s Hot Picks'];
  const largeSubs   = ["Fashion that's as unique as you are - shop now", 'Flat 30% off • Free delivery', 'New styles dropping daily'];

  const small1Titles = ['New Collection', 'Fresh Arrivals', 'Just In'];
  const small1Subs   = ['Elevate your style game', 'Handpicked for you', 'Trendsetting fits'];

  const small2Titles = ['Best Deal', 'Steal of the Day', 'Budget Friendly'];
  const small2Subs   = ['Upgrade your closet', 'Don’t miss the price drop', 'Smart choices, smart prices'];

  return (
    <div className="promo-wrapper">
      
      <a
        href={AMAZON_LARGE}
        target="_blank"
        rel="noopener noreferrer"
        className="promo-large-card promo-card"
        aria-label="Open Amazon product (large promo)"
      >
        <img src={A} alt="Promo 1" />
        <div className="promo-content">
          <h3><RotatingText items={largeTitles} interval={3000} /></h3>
          <p><RotatingText items={largeSubs} interval={4000} /></p>
        </div>
      </a>

      <div className="promo-small-cards">
        
        <a
          href={AMAZON_SMALL1}
          target="_blank"
          rel="noopener noreferrer"
          className="promo-small-card promo-card"
          aria-label="Open Amazon product (small promo 1)"
        >
          <img src={B} alt="Promo 2" />
          <div className="promo-content">
            <h3><RotatingText items={small1Titles} interval={2800} /></h3>
            <p><RotatingText items={small1Subs} interval={3800} /></p>
          </div>
        </a>

        
        <a
          href={AMAZON_SMALL2}
          target="_blank"
          rel="noopener noreferrer"
          className="promo-small-card promo-card"
          aria-label="Open Amazon product (small promo 2)"
        >
          <img src={C} alt="Promo 3" />
          <div className="promo-content">
            <h3><RotatingText items={small2Titles} interval={3200} /></h3>
            <p><RotatingText items={small2Subs} interval={4200} /></p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default UserFeedback;
