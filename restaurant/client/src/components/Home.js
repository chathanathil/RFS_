import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import { addProduct } from "../actions/productAction";
import { showOrders, selectOrder, acceptOrder,deleteOrder } from "../actions/orderActions";
import TextField from "material-ui/TextField";
import Spinner from "./common/Spinner";
import "../style/Home.css";
import Logo from "../img/rfs.jpg";
import Logout from "../img/logout.svg";
import Food from "../img/food.jpg";
import AppleJuice from '../img/apple-juice.jpeg';
import BeefBiriyani from '../img/beef-biriyani.jpeg';
import BeefCurry from '../img/beef-curry.jpg';
import Burger from '../img/burger.jpg';
import ChickenBiriyani from '../img/chicken-biriyani.jpg';
import ChickenCurry from '../img/chicken-cur nry.jpeg';
import ChillyChicken from '../img/chilly-chicken.jpg';
import Coffee from '../img/coffee.jpg';
import EggCurry from '../img/egg-curry.jpeg';
import EggPuffs from '../img/egg-puffs.jpeg';
import IceCream from '../img/ice-cream.jpeg';
import Iddly from '../img/iddly.jpeg';
import Lime from '../img/lime.jpeg';
import MasalaDhosha from '../img/masala-dhosha.jpeg';
import Meals from '../img/meals.jpg';
import OrangeJuice from '../img/orange-juice.jpeg';  
import Tea from '../img/tea.jpeg';
import Vada from '../img/vada.jpeg';
import VegBiriyani from '../img/veg-biriyani.jpeg';
import Appam from '../img/appam.jpeg';
import Image1 from '../img/food.jpg'
import Rupee from '../img/rupee.png'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      category: "",
      desc: "",
      title: "",
      oId: "",
      dName: "",
      dPhone: "",
      dTime: ""
    };
  }
  componentDidMount() {
    this.props.showOrders();
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.orders.orders);
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onAddProduct = e => {
    e.preventDefault();
    const newProduct = {
      name: this.state.name,
      price: this.state.price,
      category: this.state.category,
      desc: this.state.desc
    };
    this.props.addProduct(newProduct);
    this.setState({ name: "" });
    this.setState({ price: "" });
    this.setState({ category: "" });
    this.setState({ desc: "" });
  };
  
  onAcceptOrder = e => {
    const deliveryBoy = {
      name: this.state.dName,
      phone: this.state.dPhone,
      time: this.state.dTime,
      order: this.state.oId
    };
    this.props.acceptOrder(deliveryBoy);
    this.props.deleteOrder(this.state.oId);
    console.log(this.state.oId);
  };
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    let orders =
      this.props.orders.orders != null ? (
        this.props.orders.orders.map(order => {
          return (
            <div key={order._id} className="order-card">
              <h1>{order.user.name}</h1>
              <button 
                className="show-button"
                onClick={() => {
                  this.props.selectOrder(order._id);
                  this.setState({ title: order.user.name });
                  this.setState({ oId: order._id });
                }}
                data-toggle="modal"
                data-target="#orderModalLong"
              >
                Show
              </button>
            </div>
          );
        })
      ) : (
        <Spinner />
      );

    let orderWindowContent =
      this.props.orders.order != null ? (
        <div>
          {this.props.orders.order[0].cart.products.map((item, index) => {
            return (
              <div>
                <div key={item._id} className="item-card">
                  <img src={
                     item.name=="Tea"?Tea:
                     item.name=="Coffee"?Coffee:
                     item.name=="Veg Biriyani"?VegBiriyani:
                     item.name=="Vada"?Vada:
                     item.name=="Samoosa"?Samoosa:
                     item.name=="Sambaram"?Sambaram:
                     item.name=="Puttu"?Puttu:
                     item.name=="Orange juice"?OrangeJuice:
                     item.name=="Meals"?Meals:
                     item.name=="Masala Dhosha"?MasalaDhosha:
                     item.name=="Lime"?Lime:
                     item.name=="Iddly"?Iddly:
                     item.name=="IceCream"?IceCream:
                     item.name=="Egg puffs"?EggPuffs:
                     item.name=="Egg curry"?EggCurry:
                     item.name=="Chilly chicken"?ChillyChicken:
                     item.name=="Chicken curry"?ChickenCurry:
                     item.name=="Chicken biriyani"?ChickenBiriyani:
                     item.name=="Burger"?Burger:
                     item.name=="Beef roast"?BeefCurry:
                   item.name=="Beef biriyani"?BeefBiriyani:
                     item.name=="Apple juice"?AppleJuice:
                     item.name=="Appam"?Appam:Image1
                  } alt="RFS" />

                  <h3>{item.name}</h3>
                  <br />
                  <h5 className="price">
            <img src={Rupee} style={{ height: "1vw", width: "1vw" }} />
            {item.price}
          </h5>
                  {/* <h5>{item.price}</h5> */}
                  <br />
                  <p>{item.count}</p>
                </div>
                <hr className="hr" />
              </div>
            );
          })}
          <h1 className="total">
            Total:{this.props.orders.order[0].cart.total}
          </h1>
          <hr className="hr" />
          <p className="details">Phone:{this.props.orders.order[0].phone}</p>
          <p className="details">Seat:{this.props.orders.order[0].seat}</p>
          <p className="details">
            Suggestions:{this.props.orders.order[0].desc}
          </p>
        </div>
      ) : (
        <Spinner />
      );
    return (
      <div>
        <div className="nav-bar">
          <img src={Logo} alt="RFS" />

          <img
            className="logout"
            src={Logout}
            alt="Logout"
            onClick={this.onLogout}
          />
        </div>

        <br />
        <div className="main-body">
          <div className="orders"> {orders}</div>

          <div className="add-product">
           <h3 align="center">Add Items</h3>
            <input
            type="text"
            value={this.state.name}
              onChange={this.onInputChange}
            placeholder="Enter Name"
            name="name"
            required
          ></input>
            <br />
           
             <input
            type="text"
            value={this.state.price}
            onChange={this.onInputChange}
            placeholder="Enter Price"
            name="price"
            required
          ></input>
            <br />
           
             <input
            type="text"
            value={this.state.category}
            onChange={this.onInputChange}
            placeholder="Enter Category"
            name="category"
            required
          ></input>
            <br />
           
            <input
            type="text"
            value={this.state.desc}
            onChange={this.onInputChange}
            placeholder="Enter Description"
            name="desc"
            required
          ></input>
            <br />
            <br />
            <button className="show-button" onClick={this.onAddProduct}>
              Add
            </button>
          </div>
        </div>
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
                  {this.state.title}
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
              <div className="modal-body">
                {orderWindowContent}
                <hr className="hr" />
                <div className="delivery-boy">
                  <TextField
                    name="dName"
                    value={this.state.dName}
                    onChange={this.onInputChange}
                    hintText="delivery boy"
                    floatingLabelText="Delivery Boy"
                  />
                  <TextField
                    name="dPhone"
                    value={this.state.dPhone}
                    onChange={this.onInputChange}
                    hintText="phone"
                    floatingLabelText="Phone"
                  />
                  <TextField
                    name="dTime"
                    value={this.state.dTime}
                    onChange={this.onInputChange}
                    hintText="expected time"
                    floatingLabelText="Expected Time"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  // onClick={this.clearCart}
                >
                  Cancel
                </button>
                <button
                  data-dismiss="modal"
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onAcceptOrder}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  showOrders: PropTypes.func.isRequired,
  selectOrder: PropTypes.func.isRequired,
  acceptOrder: PropTypes.func.isRequired,
  deleteOrder:PropTypes.func.isRequired,
  // setProductNull: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  orders: state.orders
  // product: state.product
});
export default connect(
  mapStateToProps,
  { logoutUser, addProduct, showOrders, selectOrder, acceptOrder,deleteOrder }
)(Home);
