import cors = require("cors");
import express = require("express");
import mongoose from "mongoose";
import config from "./config";
import userRouter from './router/user';
import PhotoRouter from './router/photo';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use("/users", userRouter);
app.use("/photos", PhotoRouter);

const run = async () => {
	mongoose.set('strictQuery', false);
	await mongoose.connect(config.db);

	app.listen(port, () => {
		console.log('We are live on ' + port);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

run().catch(console.error);
