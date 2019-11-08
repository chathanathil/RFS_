const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInputs(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is Required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 charecters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
