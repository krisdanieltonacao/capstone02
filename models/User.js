const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Passwword is required"]
	},
	isAdmin :{
		type: Boolean,
		default: false
	},
	firstName:{
		type: String,
		required: [true, "Firstname is required"]
	},
	lastName: {
		type: String,
		required: [true, "Lastname is required"]
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile number is required"]
	},
	address: {
		type: String,
		required: [true, "address is required"]
	}
})

module.exports = mongoose.model("User", userSchema);
