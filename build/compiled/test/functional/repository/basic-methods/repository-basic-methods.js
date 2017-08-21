"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var QueryBuilder_1 = require("../../../../src/query-builder/QueryBuilder");
var QuestionSchema_1 = require("./model-schema/QuestionSchema");
var Blog_1 = require("./entity/Blog");
var Category_1 = require("./entity/Category");
describe("repository > basic methods", function () {
    var userSchema;
    try {
        var resourceDir = __dirname + "/../../../../../../test/functional/repository/basic-methods/";
        userSchema = require(resourceDir + "schema/user.json");
    }
    catch (err) {
        var resourceDir = __dirname + "/";
        userSchema = require(resourceDir + "schema/user.json");
    }
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [Post_1.Post, Blog_1.Blog, Category_1.Category],
                        entitySchemas: [userSchema, QuestionSchema_1.default],
                        schemaCreate: true,
                        dropSchemaOnConnection: true
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    describe("target", function () {
        it("should return instance of the object it manages", function () { return connections.forEach(function (connection) {
            var postRepository = connection.getRepository(Post_1.Post);
            postRepository.target.should.be.equal(Post_1.Post);
            var userRepository = connection.getRepository("User");
            userRepository.target.should.be.equal("User");
            var questionRepository = connection.getRepository("Question");
            questionRepository.target.should.be.instanceOf(Function);
        }); });
    });
    describe("hasId", function () {
        it("should return true if entity has an id", function () { return connections.forEach(function (connection) {
            var postRepository = connection.getRepository(Post_1.Post);
            var userRepository = connection.getRepository("User");
            var postWithId = new Post_1.Post();
            postWithId.id = 1;
            postWithId.title = "Hello post";
            postRepository.hasId(postWithId).should.be.equal(true);
            var postWithZeroId = new Post_1.Post();
            postWithZeroId.id = 0;
            postWithZeroId.title = "Hello post";
            postRepository.hasId(postWithZeroId).should.be.equal(true);
            var userWithId = {
                id: 1,
                firstName: "Jonh",
                secondName: "Doe"
            };
            userRepository.hasId(userWithId).should.be.equal(true);
            var userWithZeroId = {
                id: 1,
                firstName: "Jonh",
                secondName: "Doe"
            };
            userRepository.hasId(userWithZeroId).should.be.equal(true);
        }); });
        it("should return false if entity does not have an id", function () { return connections.forEach(function (connection) {
            var postRepository = connection.getRepository(Post_1.Post);
            var userRepository = connection.getRepository("User");
            postRepository.hasId(null).should.be.equal(false);
            postRepository.hasId(undefined).should.be.equal(false);
            var postWithoutId = new Post_1.Post();
            postWithoutId.title = "Hello post";
            postRepository.hasId(postWithoutId).should.be.equal(false);
            var postWithUndefinedId = new Post_1.Post();
            postWithUndefinedId.id = undefined;
            postWithUndefinedId.title = "Hello post";
            postRepository.hasId(postWithUndefinedId).should.be.equal(false);
            var postWithNullId = new Post_1.Post();
            postWithNullId.id = null;
            postWithNullId.title = "Hello post";
            postRepository.hasId(postWithNullId).should.be.equal(false);
            var postWithEmptyId = new Post_1.Post();
            postWithEmptyId.id = "";
            postWithEmptyId.title = "Hello post";
            postRepository.hasId(postWithEmptyId).should.be.equal(false);
            var userWithoutId = {
                firstName: "Jonh",
                secondName: "Doe"
            };
            userRepository.hasId(userWithoutId).should.be.equal(false);
            var userWithNullId = {
                id: null,
                firstName: "Jonh",
                secondName: "Doe"
            };
            userRepository.hasId(userWithNullId).should.be.equal(false);
            var userWithUndefinedId = {
                id: undefined,
                firstName: "Jonh",
                secondName: "Doe"
            };
            userRepository.hasId(userWithUndefinedId).should.be.equal(false);
        }); });
    });
    describe("createQueryBuilder", function () {
        it("should create a new query builder with the given alias", function () { return connections.forEach(function (connection) {
            var postRepository = connection.getRepository(Post_1.Post);
            var postQb = postRepository.createQueryBuilder("post");
            postQb.should.be.instanceOf(QueryBuilder_1.QueryBuilder);
            postQb.alias.should.be.equal("post");
            var userRepository = connection.getRepository("User");
            var userQb = userRepository.createQueryBuilder("user");
            userQb.should.be.instanceOf(QueryBuilder_1.QueryBuilder);
            userQb.alias.should.be.equal("user");
            var questionRepository = connection.getRepository("Question");
            var questionQb = questionRepository.createQueryBuilder("question");
            questionQb.should.be.instanceOf(QueryBuilder_1.QueryBuilder);
            questionQb.alias.should.be.equal("question");
        }); });
    });
    describe("create", function () {
        it("should create a new instance of the object we are working with", function () { return connections.forEach(function (connection) {
            var repository = connection.getRepository(Post_1.Post);
            repository.create().should.be.instanceOf(Post_1.Post);
        }); });
        it("should create a new empty object if entity schema is used", function () { return connections.forEach(function (connection) {
            var repository = connection.getRepository("User");
            repository.create().should.be.eql({});
        }); });
        it("should create a new empty object if entity schema with a target is used", function () { return connections.forEach(function (connection) {
            var repository = connection.getRepository("Question");
            repository.create().should.not.be.empty;
            repository.create().type.should.be.equal("question"); // make sure this is our Question function
        }); });
        it("should create an entity and copy to it all properties of the given plain object if its given", function () { return connections.forEach(function (connection) {
            var postRepository = connection.getRepository(Post_1.Post);
            var userRepository = connection.getRepository("User");
            var questionRepository = connection.getRepository("Question");
            var plainPost = { id: 2, title: "Hello post" };
            var post = postRepository.create(plainPost);
            post.should.be.instanceOf(Post_1.Post);
            post.id.should.be.equal(2);
            post.title.should.be.equal("Hello post");
            var plainUser = { id: 3, firstName: "John", secondName: "Doe" };
            var user = userRepository.create(plainUser);
            user.id.should.be.equal(3);
            user.firstName.should.be.equal("John");
            user.secondName.should.be.equal("Doe");
            var plainQuestion = { id: 3, title: "What is better?" };
            var question = questionRepository.create(plainQuestion);
            question.id.should.be.equal(3);
            question.title.should.be.equal("What is better?");
        }); });
    });
    describe("createMany", function () {
        it("should create entities and copy to them all properties of the given plain object if its given", function () { return connections.forEach(function (connection) {
            var postRepository = connection.getRepository(Post_1.Post);
            var plainPosts = [{ id: 2, title: "Hello post" }, { id: 3, title: "Bye post" }];
            var posts = postRepository.create(plainPosts);
            posts.length.should.be.equal(2);
            posts[0].should.be.instanceOf(Post_1.Post);
            posts[0].id.should.be.equal(2);
            posts[0].title.should.be.equal("Hello post");
            posts[1].should.be.instanceOf(Post_1.Post);
            posts[1].id.should.be.equal(3);
            posts[1].title.should.be.equal("Bye post");
        }); });
    });
    describe("preload", function () {
        var _this = this;
        it("should preload entity from the given object with only id", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var blogRepository, categoryRepository, category, blog, plainBlogWithId, preloadedBlog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogRepository = connection.getRepository(Blog_1.Blog);
                        categoryRepository = connection.getRepository(Category_1.Category);
                        category = new Category_1.Category();
                        category.name = "people";
                        return [4 /*yield*/, categoryRepository.persist(category)];
                    case 1:
                        _a.sent();
                        blog = new Blog_1.Blog();
                        blog.title = "About people";
                        blog.text = "Blog about good people";
                        blog.categories = [category];
                        return [4 /*yield*/, blogRepository.persist(blog)];
                    case 2:
                        _a.sent();
                        plainBlogWithId = { id: 1 };
                        return [4 /*yield*/, blogRepository.preload(plainBlogWithId)];
                    case 3:
                        preloadedBlog = _a.sent();
                        preloadedBlog.should.be.instanceOf(Blog_1.Blog);
                        preloadedBlog.id.should.be.equal(1);
                        preloadedBlog.title.should.be.equal("About people");
                        preloadedBlog.text.should.be.equal("Blog about good people");
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("should preload entity and all relations given in the object", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var blogRepository, categoryRepository, category, blog, plainBlogWithId, preloadedBlog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogRepository = connection.getRepository(Blog_1.Blog);
                        categoryRepository = connection.getRepository(Category_1.Category);
                        category = new Category_1.Category();
                        category.name = "people";
                        return [4 /*yield*/, categoryRepository.persist(category)];
                    case 1:
                        _a.sent();
                        blog = new Blog_1.Blog();
                        blog.title = "About people";
                        blog.text = "Blog about good people";
                        blog.categories = [category];
                        return [4 /*yield*/, blogRepository.persist(blog)];
                    case 2:
                        _a.sent();
                        plainBlogWithId = { id: 1, categories: [{ id: 1 }] };
                        return [4 /*yield*/, blogRepository.preload(plainBlogWithId)];
                    case 3:
                        preloadedBlog = _a.sent();
                        preloadedBlog.should.be.instanceOf(Blog_1.Blog);
                        preloadedBlog.id.should.be.equal(1);
                        preloadedBlog.title.should.be.equal("About people");
                        preloadedBlog.text.should.be.equal("Blog about good people");
                        preloadedBlog.categories[0].id.should.be.equal(1);
                        preloadedBlog.categories[0].name.should.be.equal("people");
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("merge", function () {
        var _this = this;
        it("should merge multiple entities", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var blogRepository, blog1, blog2, category, blog3, mergedBlog;
            return __generator(this, function (_a) {
                blogRepository = connection.getRepository(Blog_1.Blog);
                blog1 = new Blog_1.Blog();
                blog1.title = "First Blog";
                blog2 = new Blog_1.Blog();
                blog2.text = "text is from second blog";
                category = new Category_1.Category();
                category.name = "category from third blog";
                blog3 = new Blog_1.Blog();
                blog3.categories = [category];
                mergedBlog = blogRepository.merge(blog1, blog2, blog3);
                mergedBlog.should.be.instanceOf(Blog_1.Blog);
                mergedBlog.should.not.be.equal(blog1);
                mergedBlog.should.not.be.equal(blog2);
                mergedBlog.should.not.be.equal(blog3);
                mergedBlog.title.should.be.equal("First Blog");
                mergedBlog.text.should.be.equal("text is from second blog");
                mergedBlog.categories[0].name.should.be.equal("category from third blog");
                return [2 /*return*/];
            });
        }); })); });
        it("should merge both entities and plain objects", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var blogRepository, blog1, blog2, blog3, mergedBlog;
            return __generator(this, function (_a) {
                blogRepository = connection.getRepository(Blog_1.Blog);
                blog1 = { title: "First Blog" };
                blog2 = { text: "text is from second blog" };
                blog3 = new Blog_1.Blog();
                blog3.categories = [{ name: "category from third blog" }];
                mergedBlog = blogRepository.merge(blog1, blog2, blog3);
                mergedBlog.should.be.instanceOf(Blog_1.Blog);
                mergedBlog.should.not.be.equal(blog1);
                mergedBlog.should.not.be.equal(blog2);
                mergedBlog.should.not.be.equal(blog3);
                mergedBlog.title.should.be.equal("First Blog");
                mergedBlog.text.should.be.equal("text is from second blog");
                mergedBlog.categories[0].name.should.be.equal("category from third blog");
                return [2 /*return*/];
            });
        }); })); });
    });
    describe("using preload and merge together", function () {
        var _this = this;
        it("if we preload entity from the plain object and merge preloaded object with plain object we'll have an object from the db with the replaced properties by a plain object's properties", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var blogRepository, categoryRepository, firstCategory, secondCategory, blog, plainBlogWithId, preloadedBlog, mergedBlog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blogRepository = connection.getRepository(Blog_1.Blog);
                        categoryRepository = connection.getRepository(Category_1.Category);
                        firstCategory = new Category_1.Category();
                        firstCategory.name = "people";
                        return [4 /*yield*/, categoryRepository.persist(firstCategory)];
                    case 1:
                        _a.sent();
                        secondCategory = new Category_1.Category();
                        secondCategory.name = "animals";
                        return [4 /*yield*/, categoryRepository.persist(secondCategory)];
                    case 2:
                        _a.sent();
                        blog = new Blog_1.Blog();
                        blog.title = "About people";
                        blog.text = "Blog about good people";
                        blog.categories = [firstCategory, secondCategory];
                        return [4 /*yield*/, blogRepository.persist(blog)];
                    case 3:
                        _a.sent();
                        plainBlogWithId = { id: 1, title: "changed title about people", categories: [{ id: 1 }, { id: 2, name: "insects" }] };
                        return [4 /*yield*/, blogRepository.preload(plainBlogWithId)];
                    case 4:
                        preloadedBlog = _a.sent();
                        mergedBlog = blogRepository.merge(preloadedBlog, plainBlogWithId);
                        mergedBlog.should.be.instanceOf(Blog_1.Blog);
                        mergedBlog.id.should.be.equal(1);
                        mergedBlog.title.should.be.equal("changed title about people");
                        mergedBlog.text.should.be.equal("Blog about good people");
                        mergedBlog.categories[0].id.should.be.equal(1);
                        mergedBlog.categories[0].name.should.be.equal("people");
                        mergedBlog.categories[1].id.should.be.equal(2);
                        mergedBlog.categories[1].name.should.be.equal("insects");
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("query", function () {
        var _this = this;
        it("should execute the query natively and it should return the result", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var repository, promises, i, blog, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = connection.getRepository(Blog_1.Blog);
                        promises = [];
                        for (i = 0; i < 5; i++) {
                            blog = new Blog_1.Blog();
                            blog.title = "hello blog";
                            blog.text = "hello blog #" + i;
                            blog.counter = i * 100;
                            promises.push(repository.persist(blog));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, repository.query("SELECT MAX(blog.counter) as max from blog blog")];
                    case 2:
                        result = _a.sent();
                        result[0].should.not.be.empty;
                        result[0].max.should.not.be.empty;
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe.skip("transaction", function () {
        var _this = this;
        it("executed queries must success", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var repository, blogs, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = connection.getRepository(Blog_1.Blog);
                        return [4 /*yield*/, repository.find()];
                    case 1:
                        blogs = _a.sent();
                        blogs.should.be.eql([]);
                        blog = new Blog_1.Blog();
                        blog.title = "hello blog title";
                        blog.text = "hello blog text";
                        return [4 /*yield*/, repository.persist(blog)];
                    case 2:
                        _a.sent();
                        blogs.should.be.eql([]);
                        return [4 /*yield*/, repository.find()];
                    case 3:
                        blogs = _a.sent();
                        blogs.length.should.be.equal(1);
                        return [4 /*yield*/, repository.transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var promises, i, blog_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            promises = [];
                                            for (i = 0; i < 100; i++) {
                                                blog_1 = new Blog_1.Blog();
                                                blog_1.title = "hello blog";
                                                blog_1.text = "hello blog #" + i;
                                                blog_1.counter = i * 100;
                                                promises.push(repository.persist(blog_1));
                                            }
                                            return [4 /*yield*/, Promise.all(promises)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, repository.find()];
                                        case 2:
                                            blogs = _a.sent();
                                            blogs.length.should.be.equal(101);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.find()];
                    case 5:
                        blogs = _a.sent();
                        blogs.length.should.be.equal(101);
                        return [2 /*return*/];
                }
            });
        }); })); });
        it("executed queries must rollback in the case if error in transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var repository, blogs, blog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = connection.getRepository(Blog_1.Blog);
                        return [4 /*yield*/, repository.find()];
                    case 1:
                        blogs = _a.sent();
                        blogs.should.be.eql([]);
                        blog = new Blog_1.Blog();
                        blog.title = "hello blog title";
                        blog.text = "hello blog text";
                        return [4 /*yield*/, repository.persist(blog)];
                    case 2:
                        _a.sent();
                        blogs.should.be.eql([]);
                        return [4 /*yield*/, repository.find()];
                    case 3:
                        blogs = _a.sent();
                        blogs.length.should.be.equal(1);
                        return [4 /*yield*/, repository.transaction(function () { return __awaiter(_this, void 0, void 0, function () {
                                var promises, i, blog_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            promises = [];
                                            for (i = 0; i < 100; i++) {
                                                blog_2 = new Blog_1.Blog();
                                                blog_2.title = "hello blog";
                                                blog_2.text = "hello blog #" + i;
                                                blog_2.counter = i * 100;
                                                promises.push(repository.persist(blog_2));
                                            }
                                            return [4 /*yield*/, Promise.all(promises)];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, repository.find()];
                                        case 2:
                                            blogs = _a.sent();
                                            blogs.length.should.be.equal(101);
                                            // now send the query that will crash all for us
                                            throw new Error("this error will cancel all persist operations");
                                    }
                                });
                            }); }).should.be.rejected];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, repository.find()];
                    case 5:
                        blogs = _a.sent();
                        blogs.length.should.be.equal(1);
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=repository-basic-methods.js.map