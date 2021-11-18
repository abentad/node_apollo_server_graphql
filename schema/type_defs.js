const { gql } = require('apollo-server');


const typeDefs = gql`
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int!
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type Query{
        greetings(name: String): String!
        users: [User!]!
        posts: [Post!]!
        comments: [Comment!]!
    }
`;

module.exports = { typeDefs };
