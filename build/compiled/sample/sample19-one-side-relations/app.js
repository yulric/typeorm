"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var Post_1 = require("./entity/Post");
var Author_1 = require("./entity/Author");
var Category_1 = require("./entity/Category");
var PostMetadata_1 = require("./entity/PostMetadata");
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
    entities: [Post_1.Post, Author_1.Author, Category_1.Category, PostMetadata_1.PostMetadata]
};
index_1.createConnection(options).then(function (connection) {
    var postRepository = connection.getRepository(Post_1.Post);
    var authorRepository = connection.getRepository(Author_1.Author);
    var categoryRepository = connection.getRepository(Category_1.Category);
    var metadataRepository = connection.getRepository(PostMetadata_1.PostMetadata);
    var category1 = categoryRepository.create();
    category1.name = "Hello category1";
    var category2 = categoryRepository.create();
    category2.name = "Bye category2";
    var author = authorRepository.create();
    author.name = "Umed";
    var metadata = metadataRepository.create();
    metadata.comment = "Metadata about post";
    var post = postRepository.create();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.author = author;
    post.metadata = metadata;
    post.categories = [category1, category2];
    postRepository
        .persist(post)
        .then(function (post) {
        console.log("Post has been saved.");
        console.log(post);
        console.log("Now lets load posts with all their relations:");
        return postRepository.find({
            alias: "post",
            leftJoinAndSelect: {
                author: "post.author",
                metadata: "post.metadata",
                categories: "post.categories"
            }
        });
        // let secondPost = postRepository.create();
        // secondPost.text = "Second post";
        // secondPost.title = "About second post";
        // return authorRepository.persist(author);
    }).then(function (post) {
        console.log("Loaded posts: ", post);
    })
        .then(function (posts) {
        // console.log("One of the post category has been removed.");
    })
        .catch(function (error) { return console.log(error.stack); });
}, function (error) { return console.log("Cannot connect: ", error); });
//# sourceMappingURL=app.js.map