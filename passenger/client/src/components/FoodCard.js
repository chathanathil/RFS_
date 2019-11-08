import React from "react";
import PropTypes from "prop-types";
import "../style/FoodCard.css";
import Image from "../img/background.jpg";
import Rupee from "../img/rupee.png";
const FoodCard = ({
  name,
  price,
  image
  // onClicked
}) => {
  return (
    <div className="food-card">
      {/* <img src={Image} alt={name} /> */}
      <img src={image} alt={name} />

      <h3>{name}</h3>
      <h6>
        <img src={Rupee} alt="Rs." />
        {price}
      </h6>
    </div>
  );
};

FoodCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default FoodCard;
