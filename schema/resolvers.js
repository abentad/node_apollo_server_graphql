const { users, posts, comments } = require('../data');

const resolvers = {
    Query:{
        greetings(parent, args, ctx, info){
            if(args.name) return `Hello ${args.name}!`;
            return 'Hello!'
        },
        users(parent, args, ctx, info) {
            return users;
        },
        posts(parent, args, ctx, info) {
            return posts;
        },
        comments(parent, args, ctx, info) {
            return comments;
        }
    },
    Post:{
        author(parent, args, ctx, info){
            return users.find((user)=> user.id === parent.authorId);
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment)=> comment.postId === parent.id);
        }
    },
    User:{
        posts(parent, args, ctx, info){
            return posts.filter((post) => post.authorId === parent.id);
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment)=> comment.authorId === parent.id);
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user)=> user.id === parent.authorId);
        },
        post(parent, args, ctx, info){
            return posts.find((post)=> post.id === parent.postId);
        }
    }

}

module.exports = { resolvers };