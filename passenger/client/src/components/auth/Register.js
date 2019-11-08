import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../actions/authActions";
import "../../style/Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      login: true,
      errors: {}
    };  
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }
 
 
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSignup = e => {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };
    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  };
  onLogin = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  render() {
    let login = (
      <div className="login-card">
        <input
          type="text"
          value={this.state.email}
          onChange={this.onChange}
          placeholder="Enter Email"
          name="email"
          required
        ></input>
        <br />

        <input
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          placeholder="Enter Password"
          name="password"
          required
        ></input>
        <br />
        <button onClick={this.onLogin} className="submit" type="button">
          Login
        </button>
        <br />
        <Link
          to="#"
          className="card-link"

          onClick={() => {
            this.setState({ login: false });
          }}
        >
          New user...?
        </Link>
      </div>
    );
    let signup = (
      <div className="login-card">
        <input
          type="text"
          value={this.state.name}
          onChange={this.onChange}
          placeholder="Enter Name"
          name="name"
          required
        ></input>
        <br />

        <input
          type="text"
          value={this.state.email}
          onChange={this.onChange}
          placeholder="Enter Email"
          name="email"
          required
        ></input>
        <br />

        <input
          type="text"
          value={this.state.phone}
          onChange={this.onChange}
          placeholder="Enter Phone number"
          name="phone"
          required
        ></input>
        <br />

        <input
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          placeholder="Enter Password"
          name="password"
          required
        ></input>
        <br />
        <button onClick={this.onSignup} className="submit" type="button">
          Signup
        </button>
        <br />
        <Link
          to="#"
          className="card-link"
          onClick={() => {
            this.setState({ login: true });
          }}
        >
          Already have an account...?
        </Link>
      </div>
    );
    let content = this.state.login == true ? login : signup;
    return <div className="background">{content}</div>;
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(withRouter(Register));
