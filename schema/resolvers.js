let { users, posts, comments } = require('../data');
const { v4: uuidv4 } = require('uuid');

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
    Mutation: {
        createUser(parent, args, ctx, info){
            const emailTaken = users.some((user)=> user.email === args.data.email);
            if(emailTaken) throw new Error('Email taken.');
            const newUser = { id: uuidv4(), ...args.data };
            users.push(newUser);
            return newUser;
        },
        deleteUser(parent, args, ctx, info){
            const userIndex = users.findIndex((user)=> user.id === args.id);
            if(userIndex === -1) throw new Error('User not found');
            posts = posts.filter((post) => {
              const match = post.authorId === args.id;
              if(match) comments = comments.filter((comment)=> comment.postId !== post.id);
              return !match;
            });
            comments = comments.filter((comment)=> comment.authorId !== args.id);
            const deletedUser = users.splice(userIndex, 1);
            return deletedUser[0];
        },
        createPost(parent, args, ctx, info){
            const userExists = users.some((user)=> user.id === args.data.authorId);
            if(!userExists) throw new Error('User doesn\'t exist.');
            const newPost = { id: uuidv4(), ...args.data};
            posts.push(newPost);
            return newPost;
        },
        deletePost(parent, args, ctx, info){
            const postIndex = posts.findIndex((post)=> post.id === args.id);
            if(postIndex === -1) throw new Error('Post not found');
            comments = comments.filter((comment)=> comment.postId !== args.id);
            const removedPost = posts.splice(postIndex, 1);
            return removedPost[0];
        },
        createComment(parent, args, ctx, info){
            const userExists = users.some((user)=> user.id === args.data.authorId);
            const postExists = posts.some((post)=> post.id === args.data.postId && post.published);
            if(!userExists || !postExists) throw new Error('User or Post not found or published.');
            const newComment = {id: uuidv4(), ...args.data};
            comments.push(newComment);
            return newComment;
        },
        deleteComment(parent, args, ctx, info){
            const commentIndex = comments.findIndex((comment)=> comment.id === args.id);
            if(commentIndex === -1) throw new Error('Comment not found');
            const removedComment = comments.splice(commentIndex, 1);
            return removedComment[0];
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