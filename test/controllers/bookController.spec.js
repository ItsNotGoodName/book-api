const request = require("supertest");
const { expect } = require("chai");
const prefix = "/api/v1";
let app;

describe("bookController", () => {
	before(() => {
		app = require("../../src");
	});
	it("Get Top Books", async () => {
		const res = await request(app)
			.get(prefix + "/book/top")
			.expect(200);
		expect(res.body).to.be.length(0);
	});
});
