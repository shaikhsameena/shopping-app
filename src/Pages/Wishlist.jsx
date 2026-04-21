import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      Name: product.Name,
      Price: product.Price,
      image: product.image,
      quantity: 1,
    }));
    alert(`${product.Name} added to cart!`);
  };

  return (
    <div className="wishlist-page">
      <div className="breadcrumb">
        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Home
        </span>{" "}
        / <span className="current">Wishlist</span>
      </div>

      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>Items you love and want to remember</p>
      </div>

      <div className="wishlist-main">
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <i className="fas fa-heart-broken" style={{ fontSize: "64px", color: "#ccc", marginBottom: "20px" }}></i>
            <h2>Your wishlist is empty</h2>
            <p>Start adding your favorite items!</p>
            <button
              onClick={() => navigate("/product")}
              style={{
                marginTop: "20px",
                padding: "10px 30px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-toolbar">
              <span>{wishlistItems.length} item(s) in wishlist</span>
              <button
                onClick={handleClearWishlist}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Clear Wishlist
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-card">
                  <img src={item.image} alt={item.Name} />
                  <h3>{item.Name}</h3>
                  <h4>₹{item.Price}</h4>
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                      onClick={() => handleAddToCart(item)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
