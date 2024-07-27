

import React, { useState, useEffect } from "react";
import { MenuItem } from "./MenuItem";

export function Menu({ user, shoppingCartResponse, addToGuestCart , updateCartItems}) {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(`https://shopping-cart-rest-4cb8bc3adabc.herokuapp.com/api/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const menuData = await response.json();
      setData(menuData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError("Failed to load menu items. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Combos", value: "Combos" },
    { label: "Sides", value: "Sides" },
    { label: "Drinks and Sodas", value: "Drinks" },
    { label: "Desserts", value: "Desserts" },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const getFilteredData = (category) => {
    return data.filter(item =>
      category === "all" || item.category.name === category
    );
  };

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="menu">
      <div style={{ minHeight: '40vh' }} className="flex flex-col items-center justify-center bg-red-900 text-white p-4">
        <h1 className="text-2xl lg:text-left text-center lg:text-5xl font-bold">Menu</h1>
        <span className="text-l mt-2">Home / Menu</span>
      </div>
      <h1 className="text-2xl font-medium text-center text-red-500 mt-20 mb-8 font-lobster">Menu</h1>
      
      <div className="flex flex-wrap justify-center mb-8 px-4">
        {categories.map(({ label, value }) => (
          <button
            key={value}
            className={`px-2 py-1 mx-1 my-1 text-sm sm:text-base sm:px-4 sm:py-2 sm:mx-2 font-medium transition-colors duration-200 ${
              activeTab === value
                ? "text-red-900 border-b-2 border-red-500"
                : "text-gray-900 hover:text-red-500"
            }`}
            onClick={() => handleTabChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {getFilteredData(activeTab).map(item => (
          <MenuItem
            shoppingCartResponse={shoppingCartResponse}
            addToGuestCart={addToGuestCart}
            user={user}
            key={item.id}
            data={item}
            updateCartItems={updateCartItems}
          />
        ))}
      </div>
      {!user && (
        <div className="text-center mt-8 text-gray-600">
          You are browsing as a guest. Items added to cart will be saved locally.
        </div>
      )}
    </div>
  );
}