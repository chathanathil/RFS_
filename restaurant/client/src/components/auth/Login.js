import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import TextField from "material-ui/TextField";
import "../../style/Login.css";
import Logo from "../../img/rfs.jpg";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      password: ""
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onLogin = e => {
    e.preventDefault();
    const userData = {
      number: this.state.number,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    return (
      <div className="background">
        {/* <div className="logo">
          {" "}
          <img src={Logo} alt="RFS" />
        </div> */}
        <div className="login-card">
          <input
            type="text"
            value={this.state.number}
            onChange={this.onInputChange}
            placeholder="Enter Pnr"
            name="number"
            required
          ></input>
          <br />

          <input
            type="password"
            value={this.state.password}
            onChange={this.onInputChange}
            placeholder="Enter Password"
            name="password"
            required
          ></input>
          <br />
          <button onClick={this.onLogin}>Login</button>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
