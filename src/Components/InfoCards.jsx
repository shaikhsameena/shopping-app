import React, { useEffect, useState, useMemo } from "react";


const InfoCards = () => {
  
  const [isPhone, setIsPhone] = useState(false);
  const [isSmallPhone, setIsSmallPhone] = useState(false);

  useEffect(() => {
    const mqPhone = window.matchMedia("(max-width: 768px)");
    const mqSmall = window.matchMedia("(max-width: 380px)");

    const onPhone = (e) => setIsPhone(e.matches);
    const onSmall = (e) => setIsSmallPhone(e.matches);

    setIsPhone(mqPhone.matches);
    setIsSmallPhone(mqSmall.matches);

    mqPhone.addEventListener("change", onPhone);
    mqSmall.addEventListener("change", onSmall);
    return () => {
      mqPhone.removeEventListener("change", onPhone);
      mqSmall.removeEventListener("change", onSmall);
    };
  }, []);

  
  const sectionStyle = useMemo(
    () => ({
      ...styles.section,
      ...(isPhone ? { padding: "24px 14px" } : {}),
    }),
    [isPhone]
  );

  const gridStyle = useMemo(
    () => ({
      ...styles.grid,
      ...(isPhone
        ? {
            gridTemplateColumns: "repeat(2, 1fr)", // 2 cards per row on phone
            gap: "20px 16px",
            maxWidth: "420px",
          }
        : {}),
    }),
    [isPhone]
  );

  const cardStyle = useMemo(
    () => ({
      ...styles.card,
      ...(isPhone
        ? {
            textAlign: "center",
            maxWidth: "100%",
          }
        : {}),
    }),
    [isPhone]
  );

  const iconWrapperStyle = useMemo(
    () => ({
      ...styles.iconWrapper,
      ...(isPhone ? { width: "52px", height: "52px", margin: "0 auto 10px" } : {}),
    }),
    [isPhone]
  );

  const iconStyle = useMemo(
    () => ({
      ...styles.icon,
      ...(isPhone ? { fontSize: isSmallPhone ? "32px" : "40px" } : {}),
    }),
    [isPhone, isSmallPhone]
  );

  const titleStyle = useMemo(
    () => ({
      ...styles.title,
      ...(isPhone ? { fontSize: "16px", marginBottom: "6px" } : {}),
    }),
    [isPhone]
  );

  const descStyle = useMemo(
    () => ({
      ...styles.desc,
      ...(isPhone ? { fontSize: "13px" } : {}),
    }),
    [isPhone]
  );

  return (
    <section style={sectionStyle}>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={iconWrapperStyle}>
            <i className="fas fa-truck" style={iconStyle} />
          </div>
          <h3 style={titleStyle}>
            Free <br /> Shipping
          </h3>
          <p style={descStyle}>
            Enjoy the convenience of free <br /> shipping on all orders
          </p>
        </div>

        <div style={cardStyle}>
          <div style={iconWrapperStyle}>
            <i className="fas fa-shield-alt" style={iconStyle} />
          </div>
          <h3 style={titleStyle}>
            Secure <br /> Payments
          </h3>
          <p style={descStyle}>
            We adhere to the highest <br /> standards of data security
          </p>
        </div>

        <div style={cardStyle}>
          <div style={iconWrapperStyle}>
            <i className="fas fa-rotate" style={iconStyle} />
          </div>
          <h3 style={titleStyle}>
            Moneyback <br /> Guarantee
          </h3>
          <p style={descStyle}>
            We'll issue a full refund to <br /> your original payment method
          </p>
        </div>

        <div style={cardStyle}>
          <div style={iconWrapperStyle}>
            <i className="fas fa-user" style={iconStyle} />
          </div>
          <h3 style={titleStyle}>
            Customer <br /> Support
          </h3>
          <p style={descStyle}>
            Help you with any questions <br /> or concerns you may have
          </p>
        </div>
      </div>
    </section>
  );
};


const styles = {
  section: { padding: "60px 20px", fontFamily: "'Inter', sans-serif" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "60px 40px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  card: { textAlign: "left", maxWidth: "250px" },
  iconWrapper: {
    borderRadius: "14px",
    width: "64px",
    height: "64px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
  },
  icon: { fontSize: "52px", color: "#0a1931" },
  title: { fontSize: "20px", fontWeight: 700, color: "#0a1931", lineHeight: "1.3", marginBottom: "8px" },
  desc: { fontSize: "14px", color: "#6b7280", lineHeight: "1.6" },
};

export default InfoCards;
