const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const auth = require("../auth");


// Add a product - DONE 
router.post("/add", auth.verify, (req,res) =>{
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin){
		productControllers.addProduct(req.body).then(resultFromController => res.send(resultFromController));
	}
	else{
		res.send("You don't have permission on this page!");
	}
	
})

// View all active products - DONE
router.get("/", (req, res) =>{
	productControllers.getAllActive().then(resultFromController => res.send(resultFromController));
})

// View a single product - DONE
router.get("/:productId", (req,res)=>{
	productControllers.getProduct(req.params.productId).then(resultFromController => res.send(resultFromController));
})

// Update a product - DONE
router.put("/:productId", auth.verify, (req, res)=>{
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin){
		productControllers.updateProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController));
	}
	else{
		res.send("You don't have permission to update a product.");
	}
})

// Archive a product - DONE
router.patch("/:productId/archive", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization);
	if(userData.isAdmin){
		productControllers.archiveProduct(req.params.productId).then(resultFromController => res.send(resultFromController));
	}
	else{
		res.send("You don't have permission to archive a product.");
	}
})

module.exports = router;