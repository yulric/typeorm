"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var index_1 = require("../../src/index");
var Post_1 = require("./entity/Post");
var options = {
    driver: {
        // type: "postgres",
        // host: "localhost",
        // port: 5432,
        // username: "root",
        // password: "admin",
        // database: "test"
        type: "oracle",
        host: "localhost",
        username: "system",
        password: "oracle",
        port: 1521,
        sid: "xe.oracle.docker",
    },
    logging: {
        logQueries: true,
        logSchemaCreation: true
    },
    autoSchemaSync: true,
    entities: [Post_1.Post]
};
index_1.createConnection(options).then(function (connection) {
    var post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.likesCount = 100;
    var postRepository = connection.getRepository(Post_1.Post);
    postRepository
        .persist(post)
        .then(function (post) { return console.log("Post has been saved: ", post); })
        .catch(function (error) { return console.log("Cannot save. Error: ", error); });
}, function (error) { return console.log("Cannot connect: ", error); });
//# sourceMappingURL=app.js.map