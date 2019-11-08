import React from "react";
import PropTypes from "prop-types";
import Image1 from "../img/background.jpg";
import "../style/CartItem.css";
import Rupee from "../img/rupee.png";
import Appam from "../img/appam.jpeg";
import AppleJuice from "../img/apple-juice.jpeg";
import BeefBiriyani from "../img/beef-biriyani.jpeg";
import BeefCurry from "../img/beef-curry.jpg";
import Burger from "../img/burger.jpg";
import ChickenBiriyani from "../img/chicken-biriyani.jpg";
import ChickenCurry from "../img/chicken-curry.jpeg";
import ChillyChicken from "../img/chilly-chicken.jpg";
import Coffee from "../img/coffee.jpg";
import EggCurry from "../img/egg-curry.jpeg";
import EggPuffs from "../img/egg-puffs.jpeg";
import IceCream from "../img/ice-cream.jpeg";
import Iddly from "../img/iddly.jpeg";
import Lime from "../img/lime.jpeg";
import MasalaDhosha from "../img/masala-dhosha.jpeg";
import Meals from "../img/meals.jpg";
import OrangeJuice from "../img/orange-juice.jpeg";
import Puttu from "../img/puttu.jpeg";
import Sambaram from "../img/sambaram.jpeg";
import Samoosa from "../img/samoosa.jpeg";
import Tea from "../img/tea.jpeg";
import Vada from "../img/vada.jpeg";
import VegBiriyani from "../img/veg-biriyani.jpeg";

const cartItem = ({ name, price, count }) => {
  return (
    <div className="cartCard">
      <img
        src={
          name == "Tea"
            ? Tea
            : name == "Coffee"
            ? Coffee
            : name == "Veg Biriyani"
            ? VegBiriyani
            : name == "Vada"
            ? Vada
            : name == "Samoosa"
            ? Samoosa
            : name == "Sambaram"
            ? Sambaram
            : name == "Puttu"
            ? Puttu
            : name == "Orange juice"
            ? OrangeJuice
            : name == "Meals"
            ? Meals
            : name == "Masala Dhosha"
            ? MasalaDhosha
            : name == "Lime"
            ? Lime
            : name == "Iddly"
            ? Iddly
            : name == "IceCream"
            ? IceCream
            : name == "Egg puffs"
            ? EggPuffs
            : name == "Egg curry"
            ? EggCurry
            : name == "Chilly chicken"
            ? ChillyChicken
            : name == "Chicken curry"
            ? ChickenCurry
            : name == "Chicken biriyani"
            ? ChickenBiriyani
            : name == "Burger"
            ? Burger
            : name == "Beef roast"
            ? BeefCurry
            : name == "Beef biriyani"
            ? BeefBiriyani
            : name == "Apple juice"
            ? AppleJuice
            : name == "Appam"
            ? Appam
            : Image1
        }
      />
      <h5>{name}</h5>
      <p className="cart-count">{count}</p>

      <p className="cart-price">
        <img src={Rupee} style={{ height: "1vw", width: "1vw" }} />

        {price}
      </p>
    </div>
  );
};

cartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired
};

export default cartItem;
