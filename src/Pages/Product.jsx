



import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./Product.css";
import productsData from "../Data/Products.json";


const InfoCards = () => {
  return (
    <section style={styles.section} >
      <div style={styles.grid} className="abc">
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <i className="fas fa-truck" style={styles.icon}></i>
          </div>
          <h3 style={styles.title}>Free <br /> Shipping</h3>
          <p style={styles.desc}>Enjoy free shipping on all orders</p>
        </div>
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <i className="fas fa-shield-alt" style={styles.icon}></i>
          </div>
          <h3 style={styles.title}>Secure <br /> Payments</h3>
          <p style={styles.desc}>We follow top-level data security</p>
        </div>
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <i className="fas fa-rotate" style={styles.icon}></i>
          </div>
          <h3 style={styles.title}>Moneyback <br /> Guarantee</h3>
          <p style={styles.desc}>Full refund to your original payment method</p>
        </div>
        <div style={styles.card}>
          <div style={styles.iconWrapper}>
            <i className="fas fa-user" style={styles.icon}></i>
          </div>
          <h3 style={styles.title}>Customer <br /> Support</h3>
          <p style={styles.desc}>We help with any questions or concerns</p>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { width: "100%", margin: "90px 120px 10px", padding: "0px", boxSizing: "border-box" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "62px", width: "100%", maxWidth: "1200px" },
  card: { textAlign: "left" },
  iconWrapper: { borderRadius: "14px", width: "64px", height: "64px", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" },
  icon: { fontSize: "52px", color: "#0a1931" },
  title: { fontSize: "20px", fontWeight: "700", color: "#0a1931", lineHeight: "1.3", marginBottom: "8px" },
  desc: { fontSize: "14px", color: "#6b7280", lineHeight: "1.6" }
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(1000);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [deliveryFilter, setDeliveryFilter] = useState("Any");
  const [sortOption, setSortOption] = useState("Popularity");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const dispatch = useDispatch();

 
  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleRatingClick = (rating) => {
    setRatingFilter(rating === ratingFilter ? null : rating);
  };

  const filteredProducts = products
    .filter((product) => {
      const price = parseInt(product.Price || "0");
      const delivery = product.Delivery || "Any";
      const name = product.Name?.toLowerCase() || "";

    
      const reviews = product.Reviews || [];
      const totalReviews = reviews.length;
      const avgRating =
        totalReviews > 0
          ? reviews.reduce((sum, r) => sum + parseFloat(r.Rating || 0), 0) / totalReviews
          : 0;

      const matchPrice = price <= priceRange;
      const matchRating = ratingFilter ? avgRating >= ratingFilter : true;
      const matchDelivery = deliveryFilter === "Any" || delivery === deliveryFilter;
      const matchSearch = name.includes(searchTerm);

      return matchPrice && matchRating && matchDelivery && matchSearch;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.Price || 0);
      const priceB = parseFloat(b.Price || 0);
      const avgRatingA =
        a.Reviews && a.Reviews.length > 0
          ? a.Reviews.reduce((sum, r) => sum + parseFloat(r.Rating || 0), 0) / a.Reviews.length
          : 0;
      const avgRatingB =
        b.Reviews && b.Reviews.length > 0
          ? b.Reviews.reduce((sum, r) => sum + parseFloat(r.Rating || 0), 0) / b.Reviews.length
          : 0;

      if (sortOption === "Price - Low to High") return priceA - priceB;
      if (sortOption === "Price - High to Low") return priceB - priceA;
      if (sortOption === "Popularity") return avgRatingB - avgRatingA;
      return 0;
    });

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <span>Home</span> / <span className="current">Products</span>
      </div>

      <div className="product-header">
        <h1>Products</h1>
        <p>Elevate your shopping experience with our curated collection</p>
      </div>

      <div className="product-main">
      
        <div className="sidebar">
          <h4>Price</h4>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="price-slider"
          />
          <p>
            <span>₹100</span>
            <span>₹{priceRange}</span>
          </p>

          <h4>Rating</h4>
          <div className="rating-options">
            {[5].map((r) => (
              <div
                key={r}
                onClick={() => handleRatingClick(r)}
                style={{
                  cursor: "pointer",
                  fontWeight: ratingFilter === r ? "bold" : "normal",
                  color: ratingFilter === r ? "#ff9800" : "#000",
                  marginBottom: "4px",
                }}
              >
                {"⭐".repeat(r)}
              </div>
            ))}
          </div>

          <h4>Delivery</h4>
          <div>
            <label>
              <input
                type="radio"
                name="delivery"
                checked={deliveryFilter === "Any"}
                onChange={() => setDeliveryFilter("Any")}
              />{" "}
              Any
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="delivery"
                checked={deliveryFilter === "Upto 2 days"}
                onChange={() => setDeliveryFilter("Upto 2 days")}
              />{" "}
              Upto 2 days
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="delivery"
                checked={deliveryFilter === "Upto 3-5 days"}
                onChange={() => setDeliveryFilter("Upto 3-5 days")}
              />{" "}
              Upto 3-5 days
            </label>
          </div>
        </div>

       
        <div className="products-section">
          <div className="products-toolbar">
            <span>{filteredProducts.length} products found</span>
            <div className="sort-options">
              <label>Sort by</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option>Popularity</option>
                <option>Price - Low to High</option>
                <option>Price - High to Low</option>
              </select>
              <span className="view-icons">🔳🔲</span>
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => {
              const reviews = product.Reviews || [];
              const totalReviews = reviews.length;
              const avgRating =
                totalReviews > 0
                  ? reviews.reduce((sum, r) => sum + parseFloat(r.Rating || 0), 0) / totalReviews
                  : 0;

              return (
                <div key={product._id} className="product-card">
                  <img src={product.image} alt={product.Name} />
                  <p className="name">{product.Name}</p>
                  <h4>₹{product.Price}</h4>
                  <div className="rating">
                    ⭐ {avgRating.toFixed(1)} ({totalReviews} review
                    {totalReviews !== 1 ? "s" : ""})
                  </div>
  <button
  onClick={() => {
    if (product.amazonLink) {
      window.open(product.amazonLink, "_blank"); 
    } else {
      alert("Amazon link not available for this product");
    }
  }}
  className="add-to-cart-btn"
>
  Buy on Amazon
</button>


                </div>
              );
            })}
          </div>
        </div>
      </div>

      <InfoCards />
      
    </div>
    
  );
};

export default Product;
