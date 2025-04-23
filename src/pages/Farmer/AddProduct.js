import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.product;

  const [product, setProduct] = useState(
    editData || {
      id: Date.now(),
      name: "",
      price: "",
      marketPrice: "",
      quantity: "",
      quantityUnit: "",
      description: "",
      location: "",
      image: "",
    }
  );

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (
  //     !product.name ||
  //     !product.price ||
  //     !product.quantity ||
  //     !product.quantityUnit ||
  //     !product.location
  //   ) {
  //     alert("Please fill all required fields.");
  //     return;
  //   }

  //   const existing = JSON.parse(localStorage.getItem("products")) || [];
  //   let updated;

  //   if (editData) {
  //     updated = existing.map((p) => (p.id === editData.id ? product : p));
  //   } else {
  //     updated = [...existing, { ...product, id: Date.now() }];
  //   }

  //   localStorage.setItem("products", JSON.stringify(updated));
  //   navigate("/farmer/my-products");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.price ||
      !product.quantity ||
      !product.quantityUnit ||
      !product.location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // ✅ Corrected key to match authService.js
    const loggedInUser = JSON.parse(localStorage.getItem("agro_user"));
    const farmerName = loggedInUser?.username || "Unknown Farmer";

    const existing = JSON.parse(localStorage.getItem("products")) || [];
    let updated;

    if (editData) {
      updated = existing.map((p) =>
        p.id === editData.id ? { ...product, farmerName } : p
      );
    } else {
      updated = [...existing, { ...product, id: Date.now(), farmerName }];
    }

    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/farmer/my-products");
  };

  const fieldLabels = {
    name: "Product Name",
    price: "Price",
    marketPrice: "Market Price",
    quantity: "Quantity",
    location: "Location",
  };

  return (
    <div className="container mt-4">
      <h3>{editData ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        {Object.keys(fieldLabels).map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{fieldLabels[field]}</label>
            <input
              type="text"
              name={field}
              className="form-control"
              value={product[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Select for Quantity Unit */}
        <div className="mb-3">
          <label className="form-label">Quantity Unit</label>
          <select
            name="quantityUnit"
            className="form-select"
            value={product.quantityUnit}
            onChange={handleChange}
            required>
            <option value="">Select Unit</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
            <option value="litres">Litres</option>
            <option value="ml">Millilitres (ml)</option>
            <option value="units">Units</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
          {product.image && (
            <img
              src={product.image}
              alt="preview"
              className="mt-2"
              style={{ width: "120px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-success w-100 mb-4">
          {editData ? "Update Product" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
