import mongoose from "mongoose";
import config from "./config";
import User from "./model/User";
import * as crypto from 'crypto';
import Photo from './model/Photo';

const run = async () => {
	await mongoose.connect(config.db);
	const db = mongoose.connection;

	try {
		await db.dropCollection("photos");
		await db.dropCollection('users');
	} catch (e) {
		console.log("Collections were not present, skipping drop...");
	}

	const [user1, user2, user3] = await User.create(
		{
			username: 'Sasha',
			password: '12345',
			role: 'user',
			token: crypto.randomUUID(),
			displayName: 'Sany',
			avatar: 'fixtures/user1.jpeg'
		},
		{
			username: 'Bermet',
			password: 'qwerty',
			role: 'admin',
			token: crypto.randomUUID(),
			displayName: 'Beka',
			avatar: 'fixtures/user2.png'
		},
		{
			username: 'Jon doe',
			password: '123',
			role: 'user',
			token: crypto.randomUUID(),
			displayName: 'John',
			avatar: 'fixtures/user2.png'
		}
	)

	await Photo.create(
		{
			user: user1._id,
			image: "fixtures/img1.jpeg",
			title: 'some title 1',
			author: user1.displayName,
		},
		{
			user: user1._id,
			image: "fixtures/img2.jpeg",
			title: 'some title 2',
			author: user1.displayName,
		},
		{
			user: user2._id,
			image: "fixtures/img3.jpeg",
			title: 'some title 3',
			author: user2.displayName,
		},

		{
			user: user3._id,
			image: "fixtures/img1.jpeg",
			title: 'some title 4',
			author: user3.displayName,
		},
		{
			user: user3._id,
			image: "fixtures/img2.jpeg",
			title: 'some title 5',
			author: user3.displayName,
		},
		{
			user: user2._id,
			image: "fixtures/img3.jpeg",
			title: 'some title 6',
			author: user2.displayName,
		},
		{
			user: user3._id,
			image: "fixtures/img2.jpeg",
			title: 'some title 7',
			author: user3.displayName,
		},
		{
			user: user2._id,
			image: "fixtures/img3.jpeg",
			title: 'some title 8',
			author: user2.displayName,
		},
	);

	await db.close();
};

run().catch(console.error);
