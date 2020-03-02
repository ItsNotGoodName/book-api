const {
    expect
} = require('chai')
const {
    userService
} = require('../../src/services');

describe('userService', () => {
    const username = "User-userService";
    const password = '123';

    before(async () => {
        await userService.deleteUserByUsername(username);
    });

    it('Register User', async () => {
        const newUser = await userService.addUser(username, password);
        expect(newUser).to.have.property('username').that.equal(username);
    });

    it('Find User', async () => {
        const user = await userService.findUser(username)
        expect(user).to.have.property('username').that.equal(username);
    })

    it('Delete User', async () => {
        const delUser = await userService.deleteUserByUsername(username)
        expect(delUser).to.have.property('username').that.equal(username)

        const goneUser = await userService.findUser(username)
        expect(goneUser).to.be.null

    })
})