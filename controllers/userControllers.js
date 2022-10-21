const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// User Registration - DONE
module.exports.registerUser = (reqBody) =>{
	let newUser = new User({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10),
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		mobileNo: reqBody.mobileNo,
		address: reqBody.address
	})
	return newUser.save().then((user, error) =>{
		if(error){
			return false;
		}
		else{
			console.log(`${newUser}`);
			return (`${newUser.email} is registered successfully.`);
		}
	})
}

// User Authentication - DONE
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null){
			return ("User not found.");
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)}
			}
			else{
				return ("Invalid Username/Password");
			}
		}
	})
}

// Create Order - Customer - DONE
module.exports.createOrder = async (data) =>{
let newOrder 
	let isOrderUpdated = await Order.findById(data.userId).then(orderResult =>{
				
				newOrder = new Order({
					userId: data.userId,
					productId: data.productId,
					productName: data.productName,
					price: 0,
					quantity: data.quantity,
					total: 0
				})
				return newOrder.save().then((order, error) =>{
					if(error){
						return false;
						}
					else{
						return true;
					}	
				})
		})
	let isProductUpdated = await Product.findById(data.productId).then(product =>{
		product.stocks = product.stocks - data.quantity;
		return product.save().then((stocks, error) =>{
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	})

	let isPriceUpdated = await Product.findById(newOrder.productId).then(priceResult =>{
		newOrder.productName = priceResult.productName;
		newOrder.price = priceResult.price;
		newOrder.total = priceResult.price * newOrder.quantity;
		return newOrder.save().then((order, error)=>{
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	})
	console.log(newOrder);
	if(isOrderUpdated && isProductUpdated && isProductUpdated){
		return (`An order of ${newOrder.quantity} unit/s of ${newOrder.productName} has been placed with a total price of Php ${newOrder.total}.`);
	}
	else{
		return false;
	}

}

// Retrieve authenticated user’s orders - DONE
module.exports.getUserOrders = (data) =>{
	return Order.find({userId: data}).then(result => result);
}

// (ADMIN) Set user as admin - DONE
module.exports.changeAccess = (userId) =>{
	return User.findByIdAndUpdate(userId, {isAdmin: true}).then((isActive, error) =>{
		if(error){
			return false;
		}
		else{
			return ("Change access accepted.")
		}
	})
}

// (ADMIN) View All Orders - DONE
module.exports.getAllOrders = () =>{
	return Order.find({}).then(result => result);
}
