import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 5001;

// middleware
app.use(rateLimiter);
app.use(express.json());

//app.use((req,res,next) => {
//	console.log("Hey we hit a req, the method is", req.method)
//	next()
//})

app.use("/api/transactions", transactionsRoute);


initDB().then (() => {
	app.listen(PORT, () => {
	console.log("Server is up and routing on PORT:", PORT);
	});
});