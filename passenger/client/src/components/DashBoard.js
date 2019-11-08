import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchProducts, setSearchNull } from "../actions/searchActions";
import { selectProduct, setProductNull } from "../actions/productActions";
import { addToCart, displyCart, clearCart } from "../actions/cartActions";
import { postOrder } from "../actions/orderActions";
import { displayStatus } from "../actions/statusAction";
import { withRouter } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import FoodCard from "./FoodCard";
import CartItem from "./CartItem";
import TextField from "material-ui/TextField";
import "../style/DashBoard.css";
import Message from "../img/message.svg";
import Cart from "../img/cart.svg";
import Image1 from "../img/background.jpg";
import Rupee from "../img/rupee.png";
import Image2 from "../img/pizza.jpg";
import img3 from "../img/spoon.jpg";
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
import img2 from "../img/2.jpg";

/////SOLVE CLEAR CART ISSUE
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      query: null,
      total: null,
      phone: "",
      seat: "",
      desc: ""
    };
  }

  componentDidMount() {
    this.props.displyCart();
    console.log("hii", this.props);
    this.setState(
      {
        query: this.props.match.params.query
      },
      () => {
        this.props.searchProducts(this.state.query);
      }
    );
  }

  componentWillReceiveProps(newProps) {
    console.log("commponent will recieve props", newProps);
    if (this.props.cart.cart != null) {
      this.setState({
        total:
          this.props.cart.cart[0] != null ? this.props.cart.cart[0].total : "0"
      });
    }
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearProduct = e => {
    e.preventDefault();

    this.props.setProductNull();
  };

  addToCart = e => {
    e.preventDefault();
    const item = {
      name: this.props.product.product.name,
      price: this.props.product.product.price,
      total:
        parseInt(this.props.product.product.price) + parseInt(this.state.total)
    };

    this.props.addToCart(item);
  };
  displyCart = e => {
    e.preventDefault();
    this.props.displyCart();
  };
  displyStatus = e => {
    e.preventDefault();
    this.props.displayStatus();
  };
  clearCart = e => {
    this.props.clearCart();
  };
  postOrder = e => {
    e.preventDefault();
    const newOrder = {
      phone: this.state.phone,
      seat: this.state.seat,
      desc: this.state.desc,
      cart: this.props.cart.cart[0]._id,
      restaurant: this.state.query
    };
    this.props.postOrder(newOrder);
    // this.props.clearCart();
  };

  render() {
    //.........DASH BOARD ITEMS............
    let content =
      this.props.search.products != null ? (
        this.props.search.products.map((pdt, index) => {
          return (
            <Link
              key={pdt._id}
              to="#"
              onClick={() => {
                this.props.selectProduct(pdt._id);
              }}
              data-toggle="modal"
              data-target="#exampleModalLong"
            >
              <FoodCard
                name={pdt.name}
                price={pdt.price}
                image={
                  pdt.name == "Tea"
                    ? Tea
                    : pdt.name == "Coffee"
                    ? Coffee
                    : pdt.name == "Veg Biriyani"
                    ? VegBiriyani
                    : pdt.name == "Vada"
                    ? Vada
                    : pdt.name == "Samoosa"
                    ? Samoosa
                    : pdt.name == "Sambaram"
                    ? Sambaram
                    : pdt.name == "Puttu"
                    ? Puttu
                    : pdt.name == "Orange juice"
                    ? OrangeJuice
                    : pdt.name == "Meals"
                    ? Meals
                    : pdt.name == "Masala Dhosha"
                    ? MasalaDhosha
                    : pdt.name == "Lime"
                    ? Lime
                    : pdt.name == "Iddly"
                    ? Iddly
                    : pdt.name == "IceCream"
                    ? IceCream
                    : pdt.name == "Egg puffs"
                    ? EggPuffs
                    : pdt.name == "Egg curry"
                    ? EggCurry
                    : pdt.name == "Chilly chicken"
                    ? ChillyChicken
                    : pdt.name == "Chicken curry"
                    ? ChickenCurry
                    : pdt.name == "Chicken biriyani"
                    ? ChickenBiriyani
                    : pdt.name == "Burger"
                    ? Burger
                    : pdt.name == "Beef roast"
                    ? BeefCurry
                    : pdt.name == "Beef biriyani"
                    ? BeefBiriyani
                    : pdt.name == "Apple juice"
                    ? AppleJuice
                    : pdt.name == "Appam"
                    ? Appam
                    : Image1
                }
                // image={Image1}
              />
            </Link>
          );
        })
      ) : (
        <Spinner />
      );

    // ...........SELECT PRODUCT...........
    let modalWindowContent =
      this.props.product.product != null ? (
        <div className="item-card">
          <img
            src={
              this.props.product.product.name == "Tea"
                ? Tea
                : this.props.product.product.name == "Coffee"
                ? Coffee
                : this.props.product.product.name == "Veg Biriyani"
                ? VegBiriyani
                : this.props.product.product.name == "Vada"
                ? Vada
                : this.props.product.product.name == "Samoosa"
                ? Samoosa
                : this.props.product.product.name == "Sambaram"
                ? Sambaram
                : this.props.product.product.name == "Puttu"
                ? Puttu
                : this.props.product.product.name == "Orange juice"
                ? OrangeJuice
                : this.props.product.product.name == "Meals"
                ? Meals
                : this.props.product.product.name == "Masala Dhosha"
                ? MasalaDhosha
                : this.props.product.product.name == "Lime"
                ? Lime
                : this.props.product.product.name == "Iddly"
                ? Iddly
                : this.props.product.product.name == "IceCream"
                ? IceCream
                : this.props.product.product.name == "Egg puffs"
                ? EggPuffs
                : this.props.product.product.name == "Egg curry"
                ? EggCurry
                : this.props.product.product.name == "Chilly chicken"
                ? ChillyChicken
                : this.props.product.product.name == "Chicken curry"
                ? ChickenCurry
                : this.props.product.product.name == "Chicken biriyani"
                ? ChickenBiriyani
                : this.props.product.product.name == "Burger"
                ? Burger
                : this.props.product.product.name == "Beef roast"
                ? BeefCurry
                : this.props.product.product.name == "Beef biriyani"
                ? BeefBiriyani
                : this.props.product.product.name == "Apple juice"
                ? AppleJuice
                : this.props.product.product.name == "Appam"
                ? Appam
                : Image1
            }
          />
          <h1>{this.props.product.product.name}</h1>
          <p className="price">
            <img src={Rupee} style={{ height: "1vw", width: "1vw" }} />
            {this.props.product.product.price}
          </p>
          <p className="category">{this.props.product.product.category}</p>
        </div>
      ) : (
        <Spinner />
      );

    // ............CART ITEMS..............
    let cartTotal =
      this.props.cart.cart != null &&
      this.props.cart.cart.map((item, index) => {
        return item.total;
      });
    let cartContent =
      this.props.cart.cart != null ? (
        this.props.cart.cart.map((item, index) => {
          return (
            <div>
              {item.products.map((p, i) => {
                return (
                  <div>
                    <CartItem
                      key={p._id}
                      name={p.name}
                      price={p.price}
                      count={p.count}
                    />
                    <hr className="hr" />
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <Spinner />
      );

    //.................STATUS ITEMS................
    let statusContent =
      this.props.status.status != null ? (
        this.props.status.status.map((st, index) => {
          return (
            <div key={st._id}>
              <h1>{st.name}</h1>
              <h3>{st.phone}</h3>
              <h4>{st.time}</h4>
            </div>
          );
        })
      ) : (
        <Spinner />
      );

    return (
      <div>
        <div className="navbar">
          <img
            data-toggle="modal"
            data-target="#statusModalLong"
            onClick={this.displyStatus}
            src={Message}
            alt="message"
            className="navbar-icon"
          />
          <img
            data-toggle="modal"
            data-target="#cartModalLong"
            onClick={this.displyCart}
            src={Cart}
            alt="cart"
            className="navbar-icon"
          />
        </div>

        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={Image2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className="main-content">{content}</div>
        {/*...........SELECT FOOD.............. */}
        <div
          className="modal fade"
          id="exampleModalLong"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{modalWindowContent}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.clearProduct}
                >
                  Close
                </button>
                <button
                  onClick={this.addToCart}
                  data-dismiss="modal"
                  type="button"
                  className="btn btn-primary"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ........CART......... */}
        <div
          className="modal fade"
          id="cartModalLong"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Cart
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{cartContent}</div>
              <div className="modal-footer">
                <h5 className="total">Total:{cartTotal}</h5>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.clearCart}
                >
                  Clear
                </button>
                <button
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#orderModalLong"
                  // onClick={this.addToCart}
                  type="button"
                  className="btn btn-primary"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ........STATUS......... */}
        <div
          className="modal fade"
          id="statusModalLong"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{statusContent}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  // onClick={this.clearCart}
                >
                  Clear
                </button>
                <button
                  data-dismiss="modal"
                  data-toggle="modal"
                  data-target="#orderModalLong"
                  // onClick={this.addToCart}
                  type="button"
                  className="btn btn-primary"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ...........ORDER............ */}
        <div
          className="modal fade"
          id="orderModalLong"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Fill the details
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div style={{ marginLeft: "8vw" }} className="modal-body">
                <TextField
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onInputChange}
                  hintText="phone"
                  floatingLabelText="phone"
                />
                <TextField
                  name="seat"
                  value={this.state.seat}
                  onChange={this.onInputChange}
                  hintText="seat"
                  floatingLabelText="seat"
                />
                <TextField
                  name="desc"
                  value={this.state.desc}
                  onChange={this.onInputChange}
                  hintText="desc"
                  floatingLabelText="desc"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  // onClick={this.clearCart}
                >
                  Clear
                </button>
                <button
                  onClick={this.postOrder}
                  data-dismiss="modal"
                  type="button"
                  className="btn btn-primary"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashBoard.propType = {
  setSearchNull: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  setProductNull: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  displyCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  postOrder: PropTypes.func.isRequired,
  displayStatus: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search,
  product: state.product,
  cart: state.cart,
  status: state.status
});

export default connect(
  mapStateToProps,
  {
    searchProducts,
    setSearchNull,
    selectProduct,
    setProductNull,
    addToCart,
    displyCart,
    clearCart,
    postOrder,
    displayStatus
  }
)(withRouter(DashBoard));
