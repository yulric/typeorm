"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var Post_1 = require("./entity/Post");
var Author_1 = require("./entity/Author");
var options = {
    driver: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test"
    },
    logging: {
        logOnlyFailedQueries: true,
        logFailedQueryError: true
    },
    autoSchemaSync: true,
    entities: [Post_1.Post, Author_1.Author]
};
index_1.createConnection(options).then(function (connection) {
    var postRepository = connection.getRepository(Post_1.Post);
    var authorRepository = connection.getRepository(Author_1.Author);
    var authorPromise = authorRepository.findOneById(1).then(function (author) {
        if (!author) {
            author = new Author_1.Author();
            author.name = "Umed";
            return authorRepository.persist(author).then(function (savedAuthor) {
                return authorRepository.findOneById(1);
            });
        }
        return author;
    });
    var postPromise = postRepository.findOneById(1).then(function (post) {
        if (!post) {
            post = new Post_1.Post();
            post.title = "Hello post";
            post.text = "This is post contents";
            return postRepository.persist(post).then(function (savedPost) {
                return postRepository.findOneById(1);
            });
        }
        return post;
    });
    return Promise.all([authorPromise, postPromise])
        .then(function (results) {
        var author = results[0], post = results[1];
        author.posts = [post];
        return authorRepository.persist(author);
    })
        .then(function (savedAuthor) {
        console.log("Author has been saved: ", savedAuthor);
    })
        .catch(function (error) { return console.log(error.stack); });
}, function (error) { return console.log("Cannot connect: ", error); });
//# sourceMappingURL=app.js.map