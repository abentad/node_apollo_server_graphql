const Subscription = {
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info){
            const post = db.posts.find((post)=> post.id === postId);
            if(!post) throw new Error('Post not found.');

            return pubsub.asyncIterator(`comment_${postId}`);
        }
    },
    post: {
        subscribe(parent, args, { db, pubsub }, info){

            return pubsub.asyncIterator('post');
        }
    }
};

module.exports = Subscription;