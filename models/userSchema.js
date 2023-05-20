const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
  },
  messages: [],
});

// save message
userSchema.methods.Messagesave = async function (message) {
  try {
    this.messages = this.messages.concat({ message });
    await this.save();
    return this.messages;
  } catch (e) {
    console.log(e);
  }
};

// create model
const users = new mongoose.model("users", userSchema);

module.exports = users;
