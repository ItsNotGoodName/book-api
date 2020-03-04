const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

class UserService {
	constructor(models) {
		this.models = models;
	}

	async getAllUsers() {
		return await this.models.User.find({}).exec();
	}

	async addAuthorToUser(user, authorname) {
		if (user.author != null) {
			return null;
		}
		const author = await new this.models.Author({
			name: authorname
		});
		await this.models.User.updateOne(
			{ _id: user._id },
			{
				$set: { author }
			}
		);
		await author.save();
		return await this.findUserById(user._id);
	}

	async deleteUserByUsername(username) {
		const user = await this.models.User.findOne({
			username
		});
		if (user === null) return false;
		return await user.deleteOne();
	}

	async addUser(username, password) {
		const userExists = await this.models.User.findOne({
			username: username
		}).exec();

		if (userExists !== null) {
			return false;
		}
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const user = await this.models
			.User({
				_id: new mongoose.Types.ObjectId(),
				username: username,
				password: hash
			})
			.save();
		return user;
	}

	async findUserById(_id) {
		return await this.models.User.findById(_id).populate("author");
	}

	async findUser(username) {
		return await this.models.User.findOne({
			username: username
		}).populate("author");
	}
}

module.exports = UserService;
