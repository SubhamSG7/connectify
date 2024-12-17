import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import argon2 from "argon2";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[a-zA-Z\s]{3,}$/;
const mobileRegex = /^(\+?[1-9]\d{1,3})?[-.\s]?\d{10}$/;
const countryCodes = ["+61", "+1", "+91", "+44"];
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    match: [
      nameRegex,
      `Name should contain at least 3 characters and no special characters are allowed`,
    ],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [emailRegex, `Invalid email _id`],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    match: [
      nameRegex,
      `username should contain at least 3 characters and no special characters are allowed`,
    ],
  },
  mobile: {
    type: String,
    required: [true, "mobile number is required"],
    match: [mobileRegex, `Mobile Number Invalid`],
  },
  countrycode: {
    type: String,
    required: [true, "country-code required"],
    validate: {
      validator: function (value) {
        return countryCodes.includes(value);
      },
      message: "Invalid Country-Code",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/,
      "Password Should be minimum 7 characters with alphaNumeric values ",
    ],
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});
userSchema.methods.comparePassword = async function (inputPassword) {
  try {
    return await argon2.verify(this.password, inputPassword);
  } catch (error) {
    console.log(error);
    return false;
  }
};

userSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique. '{VALUE}' is already taken.",
});
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await argon2.hash(this.password);
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("Users", userSchema);

export default User;
