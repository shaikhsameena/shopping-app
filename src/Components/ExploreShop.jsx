import React from "react";
import "./ExploreShop.css";

const products = [
  {
    id: 1,
    img: "/images/p4.jpg",
    price: 721,
    name: "kurtis",
    stock: true,
    amazon:
    "https://www.amazon.in/PARTHVI-Printed-Handwork-Dupatta-P-1079-Purple-S/dp/B0F5PVZNQW/ref=sr_1_24?crid=10ZZR2NEWW66I&dib=eyJ2IjoiMSJ9.JgjtTcXMBAIRza9r9z9QxSPE-hOBW1kxJufmulDrlBvtM6XlkrMY9jssYlUY6fy0e3GudFDGXryktZcxLmpIapeo20IyE5F-S7xOl1Tt2VqEHVip_jmt8TPKkcNVR_DK5O-kukG6eObqUWojsElDz-3tg7ioHC3h_agt-XWJpEH_G32pyVYTk7f4GsGf4P_0Mxd3QlNJS90ELwD2Y_S3xSaBoVCvB9yP8iHS_nSVGjCVEQsUqTMsC3xQVEfRx4IMN8Koj4Z7L1tUvLEA8vg0IfH-i7ef80MFAJ-_wWYwaXc.SUZj2VI-mxQ3LayJ5SrCYADxXGYq-eE2gEY_RYqtlF0&dib_tag=se&keywords=womens%2Bdresses&qid=1760029488&sprefix=women%2Caps%2C1113&sr=8-24&th=1&psc=1",
    rating: 4.8,
    reviews: 15,
  },
  {
    id: 2,
    img: "/images/C.jpg",
    price: 399,
    name: "Western Top",
    stock: true,
    amazon:
    "https://www.amazon.in/LITZO-Regular-Stylish-Western-T-L-04-M/dp/B0DSKMDLRB/ref=sr_1_21?crid=2DV4XDISBOKNE&dib=eyJ2IjoiMSJ9.yGmqQhlmTt_IyheK-Rs6RXRxiVt-TQkGKBKYclQhN-agMxk1bScuWx7RMBIYTjVpgcFuvT1MHEZXBH0lA-KnnEYADgoY4n_wPJ6k-xMaYzwJniegXUvxt553VzB8d_SMPRFjCm8lA0sROVUOg9Q5PnwINKJ8K5MV-jNLhBOcjXOX4RoT5-W3MxLQd8GG2JjLFbM8lsYKhTQp-GqogqBqnqDyy-Umt1woiYlgh1u_xQ8SNCAKlP3Z8DDrDHaz4ZP5faMtPJpS78Qw8_15U_2KXf15H_dyS8h_kfhpqUjqdw4.TYsTzA82IoNXwV7oHE1-L7zfZTk764CUyEk_CNbUl3M&dib_tag=se&keywords=womens%2Bformal%2Bwear%2Bfor%2Boffice&qid=1760030578&sprefix=womens%2Bformal%2Bw%2Caps%2C286&sr=8-21&th=1&psc=1",
    rating: 4.6,
    reviews: 10,
  },
  {
    id: 3,
    img: "/images/bbb.jpg",
    price: 399,
    name: "Silk Saree",
    stock: true,
    amazon:
    "https://www.amazon.in/Sidhidata-Boarder-Unstitched-Chhaava-Purple_Purple_Free/dp/B0F3HYMMR4/ref=sr_1_40?crid=1A14B4GN0Q29M&dib=eyJ2IjoiMSJ9.Yrnf7ha3p_P3ztn_pCnu9MYzUTpUG3ipiOIDejzIZ2WLT_MJLgVMhGaLhD1z6ZQ0rnCP5oCI532VWYKK-uJyvb372dvevr_bI5ibU1-fM86cmVhqGqE7r3VyAr9tguFp1NL3xjjckV1b1C3WNNZh-Y3VvsJn9_tFuPO-zGDtvxinvCqXErVbviWgUiKIiamqykwc9NRDu8IJkWljftvRC1ZDvG-x9pj7-StObAvg0vv5aXzHdmL00dYItuV6NqPTZJXQxf-yn9EEVCyGP8ZLHi7GmhVUwAgePqU9be_E_zg.czzchyM33-znOuLbu6ycQU_qRMFtAvLnRWr6Uq-wQL0&dib_tag=se&keywords=womens%2Bsarees&qid=1760031198&sprefix=womens%2Bsaree%2Caps%2C273&sr=8-40&th=1",
    rating: 4.9,
    reviews: 17,
  },
  {
    id: 4,
    img: "/images/H1.jpg",
    price: 449,
    name: "Sleeve Shirt",
    stock:true,
    amazon: "https://www.amazon.in/DEELMO-Casual-Button-Fashion-Textured/dp/B0D4MCTRZS/ref=sr_1_11_sspa?crid=34PMRECKVON7W&dib=eyJ2IjoiMSJ9.aEa6CiH0wJVO7oG4pp8s5FU0H5cFhrfp5KEHU_fjojIPNbG6U5GKNofOSZpocIKPiufTS5cyiWnL4c2BRAVvIiJju15obGnJkVQ-TOxmnxzVu2rM9BSQNfQvEbZj5aBerZyEpHf2Q86f84RNREbMxPtWfA0JKqKOGE4yUapxZmq1UuKDyFpp49S1KmjghRSLElREYroK2LW3dnLKDLkQyNNpGLDCI9TB2ixyf8uDLyvlSLVWI5_5lEF-CBm29wzqW2-C8J8FKLy23sEHzGaMVbGkPOpVWvtBKfB9qs_NbjQ.YYUjT1aYmOQieny3tG1Ax7-qwNVIEa7o747Ss9dQ6aM&dib_tag=se&keywords=men%2Bshirts&qid=1760031622&sprefix=men%2Bsir%2Caps%2C266&sr=8-11-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&th=1&psc=1",
    rating: 4.3,
    reviews: 35,
  },
  {
    id: 5,
    img: "/images/H2.jpg",
    price: 379,
    name: "Fit-Shirt",
    stock: true,
    amazon: "https://www.amazon.in/Lymio-Casual-Stylish-Rib-Shirt-Khakhi/dp/B0CRPH5L6B/ref=sr_1_21?crid=34PMRECKVON7W&dib=eyJ2IjoiMSJ9.aEa6CiH0wJVO7oG4pp8s5FU0H5cFhrfp5KEHU_fjojIPNbG6U5GKNofOSZpocIKPiufTS5cyiWnL4c2BRAVvIiJju15obGnJkVQ-TOxmnxzVu2rM9BSQNfQvEbZj5aBerZyEpHf2Q86f84RNREbMxPtWfA0JKqKOGE4yUapxZmq1UuKDyFpp49S1KmjghRSLElREYroK2LW3dnLKDLkQyNNpGLDCI9TB2ixyf8uDLyvlSLVWI5_5lEF-CBm29wzqW2-C8J8FKLy23sEHzGaMVbGkPOpVWvtBKfB9qs_NbjQ.YYUjT1aYmOQieny3tG1Ax7-qwNVIEa7o747Ss9dQ6aM&dib_tag=se&keywords=men%2Bshirts&qid=1760031622&sprefix=men%2Bsir%2Caps%2C266&sr=8-21&th=1&psc=1",
    rating: 4.4,
    reviews: 25,
  },
  {
    id: 6,
    img: "/images/H3.jpg",
    price: 399,
    name: "Formal Dress",
    stock: false,
    amazon: "https://www.amazon.in/dp/B0XXXXX6",
    rating: 4.2,
    reviews: 27,
  },
   {
    id: 7,
    img: "/images/K1.jpg",
    price: 699,
    name: "Kurti and Sharara with Dupatta",
    stock: true,
    amazon:
      "https://www.amazon.in/T-U-N-ALL-THINGS-UBER-NICE/dp/B0FMYKGJ42/ref=sr_1_2_sspa?crid=10HZTD30RPLH7&dib=eyJ2IjoiMSJ9.AK9t9cBxqqYXyqB3qhg4DHdoYxVjsWwLKfGSJLzX-4gC7vI2c5HJvvukfcgRqAqUOjyLap9WAWWAi4hTtve2eqf5vqTyftN8W8bsIhnjrcxEFsP14JSaL2fXyRRVbwq118hm2W2jYm080Y0THuvbTJX7SVz-txDLTm5RI8V4msX6Xs7WRnmYeVVWOS-k-9v-VHLEDHMcfYTZa4XE1s1JTKF2zSqu0g1Azh3fpnv_XG1bCsvax0TRio8B7_uxD673R5C8B3N_8KFROT9V6tGZCEz_YngjTPMC03Q2QB0KDMc.q6oGJ8u30KJOE8XUJZIQ8UnfileC0Egtkkh5VyMU6_Y&dib_tag=se&keywords=kids+girl+dress&qid=1760032499&sprefix=kids+girl+%2Caps%2C365&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    rating: 4.8,
    reviews: 15,
  },
   {
    id: 8,
    img: "/images/K2.jpg",
    price: 434,
    name: "net A-Line Knee-Length Dress",
    stock: false,
    amazon: "https://www.amazon.in/dp/B0XXXXX5",
    rating: 4.4,
    reviews: 25,
  },
   {
    id: 9,
    img: "/images/K3.jpg",
    price: 404,
    name: " Formal Outfit Set",
    stock: true,
    amazon:
    "https://www.amazon.in/RACHANA-ENTERPRISE-Toddler-2-Piece-Pinstripe/dp/B0F6CWSJ8G/ref=sr_1_59?crid=1A43TGVW3LAJQ&dib=eyJ2IjoiMSJ9.xQRONVURu1igkALgPutVDSFVtFGuudZ7vPB5pkXw_lNER0TX4_wd8Nb_6ToYNmRPzruihpFZYiQNNwdxEdzXjuI0RI4pJwG02tdkuAV9fQFXv0NeICUsayGYBdCr69ZghDkA_EyNQ67NEmossAlcEDIMwcwp3bIAO5szA8GeGGUDf-YqrhyKA6APGE2BMc-JNEKnqWZcns78_criSKQ_qRHv36xICIgc3C5S5zs4bg2CLnZ4HT1u3YCRkuHMa_cN3GlGFh4VyxN7dQT67WY2PpEG5wESTObZrfJE-YXZTCY.oH50ihz-L_mXtxf9h1DrwgZ08LQVcGeLjQ83z972WSw&dib_tag=se&keywords=kids%2Bboys%2Bformal%2Bdress&qid=1760033586&sprefix=kids%2Bboys%2B%2Bformaldress%2Caps%2C512&sr=8-59&th=1&psc=1",
    rating: 4.8,
    reviews: 15,
  },
 
];

const ExploreShop = () => (
  <section className="pp-wrapper">
    <p className="pp-discover">Discover</p>
    <h2 className="pp-title">Popular Products</h2>
    <p className="pp-tagline">
      Uncover a universe of exceptional products and <br /> unbeatable deals. Shop our
      ecommerce.
    </p>

    <div className="pp-grid">
      {products.map((p) => (
        <div className={`pp-item ${!p.stock ? "out-of-stock" : ""}`} key={p.id}>
          <div className="pp-imgBox">
            <img src={p.img} alt={p.name} />
            {p.stock ? (
              <span className="pp-badge">Best Seller</span>
            ) : (
              <span className="pp-badge out">Out of Stock</span>
            )}
            <i className="fa-regular fa-heart pp-heart" />
          </div>

          <div className="pp-info">
            <span className="pp-cat"></span>
            <h4 className="pp-name">{p.name}</h4>

            <div className="pp-rating">
              <i className="fa-solid fa-star" />
              {p.rating?.toFixed(1)}&nbsp;
              <a
                href={`${p.amazon}#customerReviews`}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-reviews"
              >
                {p.reviews} reviews
              </a>
            </div>

            <div className="pp-price">₹{p.price}</div>

            <a
              href={p.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-buyBtn"
            >
              {p.stock ? "Buy on Amazon" : "Buy on Amazon"}
            </a>
          </div>
        </div>
      ))}
    </div>

    <button className="pp-seeMore">See More</button>
  </section>
);

export default ExploreShop;
