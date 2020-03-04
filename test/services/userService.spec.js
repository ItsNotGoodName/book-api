const { expect } = require("chai");
const { userService } = require("../../src/services");

describe("userService", () => {
	const username = "User-userService";
	const password = "123";
	const authorName = "AuthorName";
	let user;

	before(async () => {
		await userService.deleteUserByUsername(username);
	});

	it("Register User", async () => {
		user = await userService.addUser(username, password);
		expect(user)
			.to.have.property("username")
			.that.equal(username);
	});
	it("Add author to user", async () => {
		expect(user)
			.to.have.property("author")
			.to.equal(null);

		const newUser = await userService.addAuthorToUser(user, authorName);

		expect(newUser)
			.to.have.property("author")
			.to.have.property("name")
			.to.equal(authorName);
		user = newUser;
	});
	it("Add author to user twice", async () => {
		const newUser = await userService.addAuthorToUser(user, authorName);

		expect(newUser).to.be.null;
	});

	xit("Add author to user race condition", async () => {
		raceUser = await userService.addUser(username, password);
		let raceUser2, raceUser3;
		await Promise.all([
			async () => (raceUser2 = userService.addAuthorToUser(user, "foo")),
			async () =>
				(raceUser3 = await userService.addAuthorToUser(user, "bar"))
		]);
		expect(raceUser3).to.be.null;
	});
	it("Find User", async () => {
		const user = await userService.findUser(username);
		expect(user)
			.to.have.property("username")
			.that.equal(username);
	});

	it("Delete User", async () => {
		const delUser = await userService.deleteUserByUsername(username);
		expect(delUser)
			.to.have.property("username")
			.that.equal(username);

		const goneUser = await userService.findUser(username);
		expect(goneUser).to.be.null;
	});
});
