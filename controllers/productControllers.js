const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// (ADMIN) Create Product - DONE
module.exports.addProduct = (reqBody) =>{
	let newProduct = new Product({
		productName: reqBody.productName,
		description: reqBody.description,
		price: reqBody.price,
		stocks: reqBody.stocks
	})
	return newProduct.save().then((course, error) =>{
		if(error){
			return false
		}
		else{
			console.log(newProduct);
			return (`${newProduct.stocks} unit/s of ${newProduct.productName} with the price of Php${newProduct.price}/unit has been added to your inventory.`);
		}
	})
}

// (ADMIN) Update Product Information - DONE
module.exports.updateProduct = (productId, reqBody) =>{
	let updatedProduct = {
		productName: reqBody.productName,
		description: reqBody.description,
		price: reqBody.price,
		stocks: reqBody.stocks,
		isActive: reqBody.isActive
	}
	return Product.findByIdAndUpdate(productId, updatedProduct).then((productUpdate, error) =>{
		if(error){
			return false;
		}
		else{
			console.log(updatedProduct)
			return (`${updatedProduct.productName} has been updated and is now available.`);
		}
	})
}

// (ADMIN) Archive Product - DONE
module.exports.archiveProduct = (productId) =>{
	return Product.findByIdAndUpdate(productId, {isActive: false}).then((isActive, error) =>{
		if(error){
			return false;
		}
		else{
			return ("Product is now archived.")
		}
	})
}

// (ADMIN) Update Product for Shipping

// Retrieve all active products (get) - DONE
module.exports.getAllActive = () =>{
	return Product.find({isActive:true}).then(result => result);
}

// Retrieve single product (get) - DONE
module.exports.getProduct = (productId) =>{
	return Product.findById(productId).then(result => result);
}


