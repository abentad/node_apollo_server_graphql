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
    updateUser(parent, args, { db }, info){
        const { id, data } = args;
        const user = db.users.find((user)=> user.id === id);
        if(!user) throw new Error('User not found.');
        if(typeof(data.email) === 'string'){
            const emailTaken = db.users.some((user)=> user.email === data.email);
            if(emailTaken) throw new Error('Email already registered.');
            user.email = data.email;
        }
        if(typeof(data.name) === 'string') user.name = data.name;
        if(typeof(data.age) !== 'undefined') user.age = data.age;
        return user; 
    },
    createPost(parent, args, { db, pubsub}, info){
        const userExists = db.users.some((user)=> user.id === args.data.authorId);
        if(!userExists) throw new Error('User doesn\'t exist.');
        const newPost = { id: uuidv4(), ...args.data};
        db.posts.push(newPost);
        if(newPost.published) pubsub.publish('post', { post: { mutation: 'CREATED', data: newPost } });
        return newPost;
    },
    deletePost(parent, args, { db, pubsub }, info){
        const postIndex = db.posts.findIndex((post)=> post.id === args.id);
        if(postIndex === -1) throw new Error('Post not found');
        db.comments = db.comments.filter((comment)=> comment.postId !== args.id);
        const [removedPost] = db.posts.splice(postIndex, 1);
        if(removedPost.published) {
            pubsub.publish('post', { post: {mutation: 'DELETED', data: removedPost} });
        }
        return removedPost;
    },
    updatePost(parent, args, { db, pubsub }, info){
        const { id, data } = args;
        const post = db.posts.find((post)=> post.id === id);
        const originalPost = { ...post };
        if(!post) throw new Error('Post not found');
        if(typeof(data.title) === 'string') post.title = data.title;
        if(typeof(data.body) === 'string') post.body = data.body;
        if(typeof(data.published) === 'boolean') {
            post.published = data.published;
            if(originalPost.published && !post.published){
                //DELETED post Subscription
                pubsub.publish('post', { post: {mutation: 'DELETED', data: originalPost }});
            }else if(!originalPost.published && post.published){
                //CREATED post Subscription
                pubsub.publish('post', { post: {mutation: 'CREATED', data: post }});
            }
        }
        if(originalPost.published){
            //UPDATED post subscription
            pubsub.publish('post', { post: {mutation: 'UPDATED', data: post }});
        }
        return post;
    },
    createComment(parent, args, { db, pubsub }, info){
        const userExists = db.users.some((user)=> user.id === args.data.authorId);
        const postExists = db.posts.some((post)=> post.id === args.data.postId && post.published);
        if(!userExists || !postExists) throw new Error('User or Post not found or published.');
        const newComment = {id: uuidv4(), ...args.data};
        db.comments.push(newComment);
        pubsub.publish(`comment_${args.data.postId}`, { comment: newComment });
        return newComment;
    },
    deleteComment(parent, args, { db }, info){
        const commentIndex = db.comments.findIndex((comment)=> comment.id === args.id);
        if(commentIndex === -1) throw new Error('Comment not found');
        const removedComment = db.comments.splice(commentIndex, 1);
        return removedComment[0];
    },
    updateComment(parent, args, { db }, info){
        const { id, data } = args;
        const comment = db.comments.find((comment)=> comment.id === id);
        if(!comment) throw new Error('Comment not found');
        if(typeof(data.text) === 'string') comment.text = data.text;
        return comment;
    }
};

module.exports = Mutation;