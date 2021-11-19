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

    type Mutation{
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput!): Comment!
        deleteComment(id: ID!): Comment!
    }

    input CreateUserInput{
        name: String!
        email: String!
        age: Int!
    }

    input CreatePostInput{
        title: String!
        body: String!
        published: Boolean!
        authorId: ID!
    }

    input CreateCommentInput{
        authorId: ID!
        postId: ID!
        text: String!
    }
`;

module.exports = { typeDefs };
