const request = require("supertest");
const { expect } = require("chai");
const prefix = "/api/v1";
let app;
const username = "Bob";
const password = "Bill";

describe("userController", () => {
	before(() => {
		app = require("../../src");
	});
	describe.skip("/uesr/register", () => {
		it("Register User without username or password", async () => {
			await request(app)
				.post(prefix + "/user/register")
				.expect(400)
				.expect("Content-Type", /json/);
		});
		it("Register User without username", async () => {
			const t = await request(app)
				.post(prefix + "/user/register")
				.send({ username })
				.set("Accept", "application/json")
				.expect(400)
				.expect("Content-Type", /json/);
		});
		it("Register User without password", async () => {
			await request(app)
				.post(prefix + "/user/register")
				.send({ password })
				.set("Accept", "application/json")
				.expect(400)
				.expect("Content-Type", /json/);
		});

		it("Register User", async () => {
			await request(app)
				.post(prefix + "/user/register")
				.send({ username, password })
				.set("Accept", "application/json")
				.expect(201)
				.expect("Content-Type", /json/);
		});

		it("Register duplicate User", async () => {
			const registerResult = await request(app)
				.post(prefix + "/user/register")
				.send({ username, password })
				.set("Accept", "application/json")
				.expect(200)
				.expect("Content-Type", /json/);

			expect(registerResult).to.have.property("errors");
		});
	});
	describe("/user/login", () => {
		it("Login with bad password", async () => {
			const loginResult = (
				await request(app)
					.post(prefix + "/user/login")
					.send({ username, password: "BDSFSD" })
					.set("Accept", "application/json")
					.expect(200)
					.expect("Content-Type", /json/)
			).body;
			expect(loginResult).to.have.property("errors");
		});
		it("Login", async () => {
			const loginResult = await request(app)
				.post(prefix + "/user/login")
				.send({ username, password })
				.set("Accept", "application/json")
				.expect(200)
				.expect("Content-Type", /json/);
		});
	});
});
