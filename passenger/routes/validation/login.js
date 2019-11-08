const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInputs(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Enter your email";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Enter a valid email";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Enter your password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
