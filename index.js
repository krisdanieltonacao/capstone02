const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 3067;

mongoose.connect("mongodb+srv://admin:admin@coursebooking.n7rpo.mongodb.net/capstone02-tonacao?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => console.log("We're connected to the cloud database."));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(process.env.PORT || port, () => {
	console.log(`API is now online on port ${process.env.PORT || port}`);
})



