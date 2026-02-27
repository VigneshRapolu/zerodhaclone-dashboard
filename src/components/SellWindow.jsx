import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const SellWindow = ({ uid }) => {
  const token = localStorage.getItem("token");
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const generalContext = useContext(GeneralContext);

  const handleSellClick = () => {
  
   
    
    
   
       axios.post(`${BACKEND_URL}/orders/sellOrder`, {
      symbol: uid,
      qty: stockQuantity,
      price: Number(stockPrice),
      mode: "SELL", 
    }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    
   generalContext.closeSellWindow();
        
    
   
    

    
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
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
              min="10"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>    

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button  className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>
          <button  className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellWindow;