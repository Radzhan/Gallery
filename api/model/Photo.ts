import mongoose, { Types } from "mongoose";
import User from './User';
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => User.findById(value),
			message: "User does not exist",
		},
	},
	author: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: [true, "image are required"],
	},
});


const Photo = mongoose.model("Photo", PhotoSchema);
export default Photo;
