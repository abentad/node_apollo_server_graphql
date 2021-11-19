const Query = {
    greetings(parent, args, ctx, info){
        if(args.name) return `Hello ${args.name}!`;
        return 'Hello!'
    },
    users(parent, args, { db }, info) {
        return db.users;
    },
    posts(parent, args, { db }, info) {
        return db.posts;
    },
    comments(parent, args, { db }, info) {
        return db.comments;
    }
};

module.exports = Query;