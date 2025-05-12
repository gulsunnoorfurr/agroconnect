// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const backgroundStyle = {
    backgroundImage:
      "url('https://oklahoma.agclassroom.org/images/resources_facts/vegetables.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "calc(100vh - 112px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    padding: "40px",
    color: "white",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)", // Safari
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textAlign: "center",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    maxWidth: "600px",
    margin: "0 15px", // Responsive spacing on small screens
  };

  return (
    <div style={backgroundStyle}>
      <div style={glassStyle}>
        <h1>Welcome to AgroConnect</h1>
        <p className="lead">
          Your one-stop platform connecting farmers and customers.
        </p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-success me-2">
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
