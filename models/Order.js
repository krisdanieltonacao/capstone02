const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
		userId: String,
		productId: String,
		productName: String,
		price: Number,
		quantity: Number,
		total: Number,
		status: {
			type: String,
			default: "pending" // "pending / paid / shipped"
		}
})
module.exports = mongoose.model("Order", orderSchema);
