import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import TextField from "material-ui/TextField";
import "../style/Home.css";
import Logout from "../img/logout.svg";
import Logo from "../img/rfs.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pnr: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSearchSubmit = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.props.history.push(`/dashBoard/${this.state.pnr}`);
    }
  };
  onLogout = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="home-background">
        <img src={Logo} />
        <input
          type="text"
          value={this.state.pnr}
          onChange={this.onChange}
          placeholder="Enter Pnr"
          name="pnr"
          onKeyUp={this.onSearchSubmit}
          required
        ></input>
        <img
          src={Logout}
          onClick={this.onLogout}
          className="submit"
          type="button"
        />
      </div>
    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);
