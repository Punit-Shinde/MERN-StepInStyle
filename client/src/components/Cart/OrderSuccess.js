import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate()
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>

      <button className="continueShopBtn" onClick={() => navigate("/products")} >Continue your Shopping</button>
    </div>
  );
};

export default OrderSuccess;
