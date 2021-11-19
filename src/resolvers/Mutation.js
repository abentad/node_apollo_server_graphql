const { v4: uuidv4 } = require('uuid');

const Mutation = {
    createUser(parent, args, { db }, info){
        const emailTaken = db.users.some((user)=> user.email === args.data.email);
        if(emailTaken) throw new Error('Email taken.');
        const newUser = { id: uuidv4(), ...args.data };
        db.users.push(newUser);
        return newUser;
    },
    deleteUser(parent, args, { db }, info){
        const userIndex = db.users.findIndex((user)=> user.id === args.id);
        if(userIndex === -1) throw new Error('User not found');
        db.posts = db.posts.filter((post) => {
          const match = post.authorId === args.id;
          if(match) db.comments = db.comments.filter((comment)=> comment.postId !== post.id);
          return !match;
        });
        db.comments = db.comments.filter((comment)=> comment.authorId !== args.id);
        const deletedUser = db.users.splice(userIndex, 1);
        return deletedUser[0];
    },
    createPost(parent, args, { db }, info){
        const userExists = db.users.some((user)=> user.id === args.data.authorId);
        if(!userExists) throw new Error('User doesn\'t exist.');
        const newPost = { id: uuidv4(), ...args.data};
        db.posts.push(newPost);
        return newPost;
    },
    deletePost(parent, args, { db }, info){
        const postIndex = db.posts.findIndex((post)=> post.id === args.id);
        if(postIndex === -1) throw new Error('Post not found');
        db.comments = db.comments.filter((comment)=> comment.postId !== args.id);
        const removedPost = db.posts.splice(postIndex, 1);
        return removedPost[0];
    },
    createComment(parent, args, { db }, info){
        const userExists = db.users.some((user)=> user.id === args.data.authorId);
        const postExists = db.posts.some((post)=> post.id === args.data.postId && post.published);
        if(!userExists || !postExists) throw new Error('User or Post not found or published.');
        const newComment = {id: uuidv4(), ...args.data};
        db.comments.push(newComment);
        return newComment;
    },
    deleteComment(parent, args, { db }, info){
        const commentIndex = db.comments.findIndex((comment)=> comment.id === args.id);
        if(commentIndex === -1) throw new Error('Comment not found');
        const removedComment = db.comments.splice(commentIndex, 1);
        return removedComment[0];
    }
};

module.exports = Mutation;