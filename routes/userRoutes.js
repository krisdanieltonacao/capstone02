const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const auth = require("../auth");


router.post("/register",(req, res) =>{
	userControllers.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

router.post("/login", (req, res)=>{
	userControllers.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

router.patch("/:userId/setAsAdmin", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin){
		userControllers.changeAccess(req.params.userId).then(resultFromController => res.send(resultFromController));
	}
	else{
		res.send("You're not allowed to access this page!")
	}
})

router.post("/addOrder", auth.verify, (req, res)=>{
	const userData = auth.decode(req.headers.authorization)
	let data = {
		userId: userData.id,
		productId: req.body.productId,
		price: 0,
		quantity: req.body.quantity
	}
	
	if(userData.isAdmin){
		res.send("You're not allowed to access this page!")
	}
	else{
		userControllers.createOrder(data).then(resultFromController => res.send(resultFromController));
	}
})

router.get("/Orders", auth.verify, (req, res)=>{
	const userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		res.send("You're not allowed to access this page!")
	}
	else{
		userControllers.getUserOrders(userData.id).then(resultFromController => res.send(resultFromController));
	}
})

router.get("/allOrders", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization)
	if(userData.isAdmin){
		userControllers.getAllOrders().then(resultFromController => res.send(resultFromController));
	}
	else{
		res.send("You're not allowed to access this page!")
	}
})

module.exports = router;