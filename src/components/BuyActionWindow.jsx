import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const BuyActionWindow = ({ uid }) => {
  const token = localStorage.getItem("token");
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(10);
console.log(uid,"from buy action window");

  const handleBuyClick = (e) => {
   
    // console.log("hello buying");
    
    
    
    axios.post(`${BACKEND_URL}/orders/newOrder`, {
      symbol: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="10"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              required
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link to="#" className="btn btn-blue" onClick={(e)=>handleBuyClick(e)}>
            Buy
          </Link>
          <Link to="#" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;