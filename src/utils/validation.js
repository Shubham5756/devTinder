const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, password, email } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong. please enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "age", "gender", "skills" , "email" , "photoUrl"];
  const isEditallowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));
  return isEditallowed;

}
module.exports = { validateSignUpData, validateEditProfileData };

// const validator = require("validator");

// const validateSignUpData = (req) => {
//     const { firstName, lastName, password, email } = req.body;

//     if (!firstName || !lastName) {
//         throw new Error("Name is not valid");
//     }
//     else if (!validator.isEmail(email)) {
//         throw new Error("Email is not valid");
//     }
//     else if (!validator.isStrongPassword(password)) {
//         throw new Error("Password is not valid");
//     }
// };

// module.exports = validateSignUpData;
