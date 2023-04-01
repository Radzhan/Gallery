import * as express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Photo from '../model/Photo';

const PhotoRouter = express.Router();

PhotoRouter.get("/", auth, async (req, res, next) => {
	try {
		const QueryParametr = req.query.cameramen as string;

		const object = (req as RequestWithUser).user;

		if (QueryParametr === undefined) {
				const result = await Photo.find();

				return res.send(result);
		} else {
			const result = await Photo.find({user: object._id});

			return res.send(result);
		}
	} catch (e) {
		return next(e);
	}
});

PhotoRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
	try {
		const ingredientData = {
			author: req.body.author,
			user: req.body.user,
			title: req.body.title,
			image: req.file ? req.file.filename : null,
		};

		await Photo.create(ingredientData);

		return res.send(ingredientData);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.sendStatus(400).send(e);
		} else {
			return next(e);
		}
	}
});

PhotoRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Photo.findById({_id: req.params.id});

		if (!request) {
			return res.status(403).send({error: 'no Photo'});
		}

		await Photo.deleteOne({_id: req.params.id});
		res.send({message: "item was deleted"});
	} catch (e) {
		res.status(400).send(e);
	}
});

export default PhotoRouter;
