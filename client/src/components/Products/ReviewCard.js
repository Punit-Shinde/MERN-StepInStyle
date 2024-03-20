import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor: "#864D25",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
