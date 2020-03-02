const {
    userService,
    postService
} = require('../../src/services');
const {
    expect
} = require('chai');


describe('postService', () => {
    const userUsername = 'User-postService';
    const userPassword = '123';
    const postTitle = 'Title';
    const postBody = 'Body';
    let user;
    let post;

    before(async () => {
        await userService.deleteUserByUsername(userUsername);
        user = await userService.addUser(userUsername, userPassword);
        expect(user).to.not.equal(false)
    });

    after(async () => {
        await userService.deleteUserByUsername(user.username);
        const delUser = await userService.findUser(user.username);
        expect(delUser).to.be.null;
    });

    describe('#addPost()', async () => {
        it('Should add post', async () => {
            post = await postService.addPost(postTitle, postBody, user);
            expect(post).to.have.property('title', postTitle);
            expect(post).to.have.property('body', postBody);
            expect(post).to.have.property('vote', 0);
            expect(post).to.have.property('date');
        });
    });

    describe('#getPostById()', async () => {
        it('Should retrieve post', async () => {
            const foundPost = await postService.getPostById(post.id);
            expect(foundPost).to.have.property('title', postTitle);
            expect(foundPost).to.have.property('body', postBody);
            expect(foundPost).to.have.property('vote', 0);
            expect(foundPost).to.have.property('date').that.deep.equal(post.date);
        });
    });

    describe('#votePost()', () => {
        const refreshPost = async () => {
            post = await postService.getPostById(post.id, user);
        };

        const testVote = async (value, expectValue) => {
            await postService.votePost(post, user, value);
            await refreshPost();
            expect(post).to.have.property('vote', expectValue);

            const updatedUser = await userService.findUser(userUsername);
            expect(updatedUser).to.have.property('vote', expectValue);
        }

        before(async () => {
            await refreshPost();
            expect(post).to.have.property('vote', 0);
        });

        beforeEach(async () => {
            await refreshPost();
        });

        it('upvote-upvote', async () => {
            await testVote(1, 1);
            await testVote(1, 0);
        })
        it('downvote-downvote', async () => {
            await testVote(-1, -1);
            await testVote(-1, 0);
        })
        it('upvote-downvote-downvote', async () => {
            await testVote(1, 1);
            await testVote(-1, -1);
            await testVote(-1, 0);
        })
        it('downvote-upvote-upvote', async () => {
            await testVote(-1, -1);
            await testVote(1, 1);
            await testVote(1, 0);
        })
    })

    describe('#deletePost()', async () => {
        it('Should delete post', async () => {
            const deletePostResult = await postService.deletePost(post);
            expect(deletePostResult).to.have.property('ok', 1);
            expect(deletePostResult).to.have.property('deletedCount', 1);
        });

        it('Should not be possible to get post by getPostById', async () => {
            const getPostResult = await postService.getPostById(post.id);
            expect(getPostResult).to.equal(null);
        });
    });
})