let users = [
    { "id": "1", "name": "Abenezer", "email": "abeni@gmail.com", "age": 22 },
    { "id": "2", "name": "David", "email": "david@gmail.com", "age": 32 },
    { "id": "3", "name": "Liza", "email": "liza@gmail.com", "age": 43 },
    { "id": "4", "name": "Abel", "email": "abel@gmail.com", "age": 12 },
    { "id": "5", "name": "Dani", "email": "dani@gmail.com", "age": 32 },
    { "id": "6", "name": "Robel", "email": "robel@gmail.com", "age": 45 },
    { "id": "7", "name": "Roony", "email": "roony@gmail.com", "age": 23 },
    { "id": "8", "name": "Rahma", "email": "rahma@gmail.com", "age": 26 },
];
let posts = [
    { id: "1", authorId: "2", title: "Favorite video game", body: "GTA", published: false },
    { id: "2", authorId: "3", title: "color", body: "green", published: true },
    { id: "3", authorId: "2", title: "fruit", body: "orange", published: false }
];

let comments = [
    {id: "1", authorId: "3", postId: "1", "text": "nice post"},
    {id: "2", authorId: "2", postId: "2", "text": "i dont like this post"},
    {id: "3", authorId: "1", postId: "2", "text": "i realy like the post"},
    {id: "4", authorId: "5", postId: "1", "text": "i don\'t care about the post i am just here for the comments."}
]

module.exports = { users, posts, comments };