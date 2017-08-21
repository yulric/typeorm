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
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var View_1 = require("./entity/View");
var Category_1 = require("./entity/Category");
var test_utils_1 = require("../../utils/test-utils");
var Repository_1 = require("../../../src/repository/Repository");
var TreeRepository_1 = require("../../../src/repository/TreeRepository");
var index_1 = require("../../../src/index");
var NoConnectionForRepositoryError_1 = require("../../../src/connection/error/NoConnectionForRepositoryError");
var FirstCustomNamingStrategy_1 = require("./naming-strategy/FirstCustomNamingStrategy");
var SecondCustomNamingStrategy_1 = require("./naming-strategy/SecondCustomNamingStrategy");
var EntityManager_1 = require("../../../src/entity-manager/EntityManager");
var CannotGetEntityManagerNotConnectedError_1 = require("../../../src/connection/error/CannotGetEntityManagerNotConnectedError");
var Blog_1 = require("./modules/blog/entity/Blog");
var Question_1 = require("./modules/question/entity/Question");
var Video_1 = require("./modules/video/entity/Video");
describe("Connection", function () {
    var resourceDir = __dirname + "/../../../../../test/functional/connection/";
    describe("before connection is established", function () {
        var _this = this;
        var connection;
        before(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                connection = index_1.getConnectionManager().create(test_utils_1.setupSingleTestingConnection("mysql", {
                    name: "default",
                    entities: []
                }));
                return [2 /*return*/];
            });
        }); });
        after(function () {
            if (connection.isConnected)
                return connection.close();
            return Promise.resolve();
        });
        it("connection.isConnected should be false", function () {
            connection.isConnected.should.be.false;
        });
        it.skip("entity manager and reactive entity manager should not be accessible", function () {
            chai_1.expect(function () { return connection.entityManager; }).to.throw(CannotGetEntityManagerNotConnectedError_1.CannotGetEntityManagerNotConnectedError);
            // expect(() => connection.reactiveEntityManager).to.throw(CannotGetEntityManagerNotConnectedError);
        });
        // todo: they aren't promises anymore
        /*it("import entities, entity schemas, subscribers and naming strategies should work", () => {
            return Promise.all([
                connection.importEntities([Post]).should.be.fulfilled,
                connection.importEntitySchemas([]).should.be.fulfilled,
                connection.importSubscribers([]).should.be.fulfilled,
                connection.importNamingStrategies([]).should.be.fulfilled,
                connection.importEntitiesFromDirectories([]).should.be.fulfilled,
                connection.importEntitySchemaFromDirectories([]).should.be.fulfilled,
                connection.importSubscribersFromDirectories([]).should.be.fulfilled,
                connection.importNamingStrategiesFromDirectories([]).should.be.fulfilled
            ]);
        });*/
        it("should not be able to close", function () {
            return connection.close().should.be.rejected; // CannotCloseNotConnectedError
        });
        it("should not be able to sync a schema", function () {
            return connection.syncSchema().should.be.rejected; // CannotCloseNotConnectedError
        });
        it.skip("should not be able to use repositories", function () {
            chai_1.expect(function () { return connection.getRepository(Post_1.Post); }).to.throw(NoConnectionForRepositoryError_1.NoConnectionForRepositoryError);
            chai_1.expect(function () { return connection.getTreeRepository(Category_1.Category); }).to.throw(NoConnectionForRepositoryError_1.NoConnectionForRepositoryError);
            // expect(() => connection.getReactiveRepository(Post)).to.throw(NoConnectionForRepositoryError);
            // expect(() => connection.getReactiveTreeRepository(Category)).to.throw(NoConnectionForRepositoryError);
        });
        it("should be able to connect", function () {
            return connection.connect().should.be.fulfilled;
        });
    });
    describe("establishing connection", function () {
        var connection;
        it("should throw DriverOptionNotSetError when extra.socketPath and host is missing", function () {
            chai_1.expect(function () {
                connection = index_1.getConnectionManager().create({
                    driver: {
                        "type": "mysql",
                        "username": "test",
                        "password": "test",
                        "database": "test",
                    },
                    entities: [],
                    entitySchemas: [],
                    dropSchemaOnConnection: false,
                    schemaCreate: false,
                    enabledDrivers: ["mysql"],
                });
            }).to.throw(Error);
        });
    });
    describe("after connection is established successfully", function () {
        var _this = this;
        var connections;
        beforeEach(function () { return test_utils_1.createTestingConnections({ entities: [Post_1.Post, Category_1.Category], schemaCreate: true, dropSchemaOnConnection: true }).then(function (all) { return connections = all; }); });
        afterEach(function () { return test_utils_1.closeTestingConnections(connections); });
        it("connection.isConnected should be true", function () { return connections.forEach(function (connection) {
            connection.isConnected.should.be.true;
        }); });
        it("entity manager and reactive entity manager should be accessible", function () { return connections.forEach(function (connection) {
            chai_1.expect(connection.entityManager).to.be.instanceOf(EntityManager_1.EntityManager);
            // expect(connection.reactiveEntityManager).to.be.instanceOf(ReactiveEntityManager);
        }); });
        // todo: they aren't promises anymore
        it("import entities, entity schemas, subscribers and naming strategies should not be possible once connection is done", function () { return connections.forEach(function (connection) {
            chai_1.expect(function () { return connection.importEntities([Post_1.Post]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importEntitySchemas([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importSubscribers([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importNamingStrategies([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importEntitiesFromDirectories([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importEntitySchemaFromDirectories([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importSubscribersFromDirectories([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
            chai_1.expect(function () { return connection.importNamingStrategiesFromDirectories([]); }).to.throw(Error); // CannotImportAlreadyConnectedError
        }); });
        it("should not be able to connect again", function () { return connections.forEach(function (connection) {
            return connection.connect().should.be.rejected; // CannotConnectAlreadyConnectedError
        }); });
        it("should not be able to change used naming strategy", function () { return connections.forEach(function (connection) {
            chai_1.expect(function () { return connection.useNamingStrategy("something"); }).to.throw(Error); // CannotUseNamingStrategyNotConnectedError
        }); });
        it("should be able to close a connection", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(connections.map(function (connection) {
                        return connection.close();
                    }))];
            });
        }); });
    });
    describe("working with repositories after connection is established successfully", function () {
        var connections;
        before(function () { return test_utils_1.createTestingConnections({ entities: [Post_1.Post, Category_1.Category], schemaCreate: true, dropSchemaOnConnection: true }).then(function (all) { return connections = all; }); });
        after(function () { return test_utils_1.closeTestingConnections(connections); });
        it("should be able to get simple entity repository", function () { return connections.forEach(function (connection) {
            connection.getRepository(Post_1.Post).should.be.instanceOf(Repository_1.Repository);
            connection.getRepository(Post_1.Post).should.not.be.instanceOf(TreeRepository_1.TreeRepository);
            connection.getRepository(Post_1.Post).target.should.be.eql(Post_1.Post);
        }); });
        it("should be able to get tree entity repository", function () { return connections.forEach(function (connection) {
            connection.getTreeRepository(Category_1.Category).should.be.instanceOf(TreeRepository_1.TreeRepository);
            connection.getTreeRepository(Category_1.Category).target.should.be.eql(Category_1.Category);
        }); });
        // it("should be able to get simple entity reactive repository", () => connections.forEach(connection => {
        //     connection.getReactiveRepository(Post).should.be.instanceOf(ReactiveRepository);
        //     connection.getReactiveRepository(Post).should.not.be.instanceOf(TreeReactiveRepository);
        //     connection.getReactiveRepository(Post).target.should.be.eql(Post);
        // }));
        // it("should be able to get tree entity reactive repository", () => connections.forEach(connection => {
        //     connection.getReactiveTreeRepository(Category).should.be.instanceOf(TreeReactiveRepository);
        //     connection.getReactiveTreeRepository(Category).target.should.be.eql(Category);
        // }));
        it("should not be able to get tree entity repository of the non-tree entities", function () { return connections.forEach(function (connection) {
            chai_1.expect(function () { return connection.getTreeRepository(Post_1.Post); }).to.throw(Error); // RepositoryNotTreeError
            // expect(() => connection.getReactiveTreeRepository(Post)).to.throw(RepositoryNotTreeError);
        }); });
        it("should not be able to get repositories that are not registered", function () { return connections.forEach(function (connection) {
            chai_1.expect(function () { return connection.getRepository("SomeEntity"); }).to.throw(Error); // RepositoryNotTreeError
            chai_1.expect(function () { return connection.getTreeRepository("SomeEntity"); }).to.throw(Error); // RepositoryNotTreeError
            // expect(() => connection.getReactiveRepository("SomeEntity")).to.throw(RepositoryNotFoundError);
            // expect(() => connection.getReactiveTreeRepository("SomeEntity")).to.throw(RepositoryNotFoundError);
        }); });
    });
    describe("generate a schema when connection.syncSchema is called", function () {
        var _this = this;
        var connections;
        before(function () { return test_utils_1.createTestingConnections({ entities: [Post_1.Post], schemaCreate: true, dropSchemaOnConnection: true }).then(function (all) { return connections = all; }); });
        after(function () { return test_utils_1.closeTestingConnections(connections); });
        it("database should be empty after schema is synced with dropDatabase flag", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, post, loadedPost, againLoadedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        post = new Post_1.Post();
                        post.title = "new post";
                        return [4 /*yield*/, postRepository.persist(post)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, postRepository.findOneById(post.id)];
                    case 2:
                        loadedPost = _a.sent();
                        chai_1.expect(loadedPost).to.be.eql(post);
                        return [4 /*yield*/, connection.syncSchema(true)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, postRepository.findOneById(post.id)];
                    case 4:
                        againLoadedPost = _a.sent();
                        chai_1.expect(againLoadedPost).to.be.empty;
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("after connection is closed successfully", function () {
        // open a close connections
        var connections = [];
        before(function () { return test_utils_1.createTestingConnections({ entities: [Post_1.Post], schemaCreate: true, dropSchemaOnConnection: true }).then(function (all) {
            connections = all;
            return Promise.all(connections.map(function (connection) { return connection.close(); }));
        }); });
        it("should not be able to close already closed connection", function () { return connections.forEach(function (connection) {
            return connection.close().should.be.rejected; // CannotCloseNotConnectedError
        }); });
        it("connection.isConnected should be false", function () { return connections.forEach(function (connection) {
            connection.isConnected.should.be.false;
        }); });
    });
    describe("import entities and entity schemas", function () {
        var _this = this;
        var firstConnection, secondConnection;
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                firstConnection = index_1.getConnectionManager().create(test_utils_1.setupSingleTestingConnection("mysql", {
                    name: "firstConnection",
                    entities: []
                }));
                secondConnection = index_1.getConnectionManager().create(test_utils_1.setupSingleTestingConnection("mysql", {
                    name: "secondConnection",
                    entities: []
                }));
                return [2 /*return*/];
            });
        }); });
        it("should import first connection's entities only", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstConnection.importEntities([Post_1.Post]);
                        return [4 /*yield*/, firstConnection.connect()];
                    case 1:
                        _a.sent();
                        firstConnection.getRepository(Post_1.Post).should.be.instanceOf(Repository_1.Repository);
                        firstConnection.getRepository(Post_1.Post).target.should.be.equal(Post_1.Post);
                        chai_1.expect(function () { return firstConnection.getRepository(Category_1.Category); }).to.throw(Error); // RepositoryNotFoundError
                        return [4 /*yield*/, firstConnection.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should import second connection's entities only", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondConnection.importEntities([Category_1.Category]);
                        return [4 /*yield*/, secondConnection.connect()];
                    case 1:
                        _a.sent();
                        secondConnection.getRepository(Category_1.Category).should.be.instanceOf(Repository_1.Repository);
                        secondConnection.getRepository(Category_1.Category).target.should.be.equal(Category_1.Category);
                        chai_1.expect(function () { return secondConnection.getRepository(Post_1.Post); }).to.throw(Error); // RepositoryNotFoundError
                        return [4 /*yield*/, secondConnection.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should import first connection's entity schemas only", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstConnection.importEntitySchemas([require(resourceDir + "schema/user.json")]);
                        return [4 /*yield*/, firstConnection.connect()];
                    case 1:
                        _a.sent();
                        firstConnection.getRepository("User").should.be.instanceOf(Repository_1.Repository);
                        firstConnection.getRepository("User").target.should.be.equal("User");
                        chai_1.expect(function () { return firstConnection.getRepository("Photo"); }).to.throw(Error); // RepositoryNotFoundError
                        return [4 /*yield*/, firstConnection.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should import second connection's entity schemas only", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        secondConnection.importEntitySchemas([require(resourceDir + "schema/photo.json")]);
                        return [4 /*yield*/, secondConnection.connect()];
                    case 1:
                        _a.sent();
                        secondConnection.getRepository("Photo").should.be.instanceOf(Repository_1.Repository);
                        secondConnection.getRepository("Photo").target.should.be.equal("Photo");
                        chai_1.expect(function () { return secondConnection.getRepository("User"); }).to.throw(Error); // RepositoryNotFoundError
                        return [4 /*yield*/, secondConnection.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("import entities / entity schemas / subscribers / naming strategies from directories", function () {
        var _this = this;
        var connection;
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                connection = index_1.getConnectionManager().create(test_utils_1.setupSingleTestingConnection("mysql", {
                    name: "default",
                    entities: []
                }));
                return [2 /*return*/];
            });
        }); });
        afterEach(function () { return connection.isConnected ? connection.close() : {}; });
        it("should successfully load entities / entity schemas / subscribers / naming strategies from directories", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection.importEntitiesFromDirectories([__dirname + "/entity/*"]);
                        connection.importEntitySchemaFromDirectories([resourceDir + "/schema/*"]);
                        connection.importNamingStrategiesFromDirectories([__dirname + "/naming-strategy/*"]);
                        connection.importSubscribersFromDirectories([__dirname + "/subscriber/*"]);
                        return [4 /*yield*/, connection.connect()];
                    case 1:
                        _a.sent();
                        connection.getRepository(Post_1.Post).should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository(Post_1.Post).target.should.be.equal(Post_1.Post);
                        connection.getRepository(Category_1.Category).should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository(Category_1.Category).target.should.be.equal(Category_1.Category);
                        connection.getRepository("User").should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository("User").target.should.be.equal("User");
                        connection.getRepository("Photo").should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository("Photo").target.should.be.equal("Photo");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should successfully load entities / entity schemas / subscribers / naming strategies from glob-patterned directories", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection.importEntitiesFromDirectories([__dirname + "/modules/**/entity/*"]);
                        connection.importEntitySchemaFromDirectories([resourceDir + "/modules/**/schema/*"]);
                        connection.importNamingStrategiesFromDirectories([__dirname + "/modules/**/naming-strategy/*"]);
                        connection.importSubscribersFromDirectories([__dirname + "/modules/**/subscriber/*"]);
                        return [4 /*yield*/, connection.connect()];
                    case 1:
                        _a.sent();
                        connection.getRepository(Blog_1.Blog).should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository(Blog_1.Blog).target.should.be.equal(Blog_1.Blog);
                        connection.getRepository(Question_1.Question).should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository(Question_1.Question).target.should.be.equal(Question_1.Question);
                        connection.getRepository(Video_1.Video).should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository(Video_1.Video).target.should.be.equal(Video_1.Video);
                        connection.getRepository("BlogCategory").should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository("BlogCategory").target.should.be.equal("BlogCategory");
                        connection.getRepository("QuestionCategory").should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository("QuestionCategory").target.should.be.equal("QuestionCategory");
                        connection.getRepository("VideoCategory").should.be.instanceOf(Repository_1.Repository);
                        connection.getRepository("VideoCategory").target.should.be.equal("VideoCategory");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("using naming strategy", function () {
        var _this = this;
        var connection;
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                connection = index_1.getConnectionManager().create(test_utils_1.setupSingleTestingConnection("mysql", {
                    name: "default",
                    entities: []
                }));
                return [2 /*return*/];
            });
        }); });
        afterEach(function () { return connection.isConnected ? connection.close() : {}; });
        it("should use naming strategy when its class passed to useNamingStrategy method", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection.importEntities([Post_1.Post]);
                        connection.importNamingStrategies([FirstCustomNamingStrategy_1.FirstCustomNamingStrategy]);
                        connection.useNamingStrategy(FirstCustomNamingStrategy_1.FirstCustomNamingStrategy);
                        return [4 /*yield*/, connection.connect()];
                    case 1:
                        _a.sent();
                        connection.getMetadata(Post_1.Post).table.name.should.be.equal("POST");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should use naming strategy when its name passed to useNamingStrategy method", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection.importEntities([Category_1.Category]);
                        connection.importNamingStrategies([SecondCustomNamingStrategy_1.SecondCustomNamingStrategy]);
                        connection.useNamingStrategy("secondCustomNamingStrategy");
                        return [4 /*yield*/, connection.connect()];
                    case 1:
                        _a.sent();
                        connection.getMetadata(Category_1.Category).table.name.should.be.equal("category");
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error if not registered naming strategy was used (assert by name)", function () {
            connection.importEntities([Category_1.Category]);
            connection.importNamingStrategies([FirstCustomNamingStrategy_1.FirstCustomNamingStrategy]);
            connection.useNamingStrategy("secondCustomNamingStrategy");
            return connection.connect().should.be.rejected; // NamingStrategyNotFoundError
        });
        it("should throw an error if not registered naming strategy was used (assert by Function)", function () {
            connection.importEntities([Category_1.Category]);
            connection.importNamingStrategies([SecondCustomNamingStrategy_1.SecondCustomNamingStrategy]);
            connection.useNamingStrategy(FirstCustomNamingStrategy_1.FirstCustomNamingStrategy);
            return connection.connect().should.be.rejected; // NamingStrategyNotFoundError
        });
    });
    describe("skip schema generation when skipSchemaSync option is used", function () {
        var _this = this;
        var connections;
        beforeEach(function () { return test_utils_1.createTestingConnections({ entities: [View_1.View], dropSchemaOnConnection: true }).then(function (all) { return connections = all; }); });
        afterEach(function () { return test_utils_1.closeTestingConnections(connections); });
        it("database should be empty after schema sync", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var queryRunner, schema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.syncSchema(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection.driver.createQueryRunner()];
                    case 2:
                        queryRunner = _a.sent();
                        return [4 /*yield*/, queryRunner.loadTableSchemas(["view"])];
                    case 3:
                        schema = _a.sent();
                        chai_1.expect(schema.some(function (table) { return table.name === "view"; })).to.be.false;
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
    describe("Can change postgres default schema name", function () {
        var connections;
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                            enabledDrivers: ["postgres"],
                            entities: [Post_1.Post],
                            schemaName: "test-schema",
                            dropSchemaOnConnection: true
                        })];
                    case 1:
                        connections = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return test_utils_1.closeTestingConnections(connections); });
        it("schema name can be set", function () {
            return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                var post, PostRepo, query, rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, connection.syncSchema(true)];
                        case 1:
                            _a.sent();
                            post = new Post_1.Post();
                            post.title = "ChangeSchemaName";
                            PostRepo = connection.getRepository(Post_1.Post);
                            return [4 /*yield*/, PostRepo.persist(post)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, connection.driver.createQueryRunner()];
                        case 3:
                            query = _a.sent();
                            return [4 /*yield*/, query.query("select * from \"test-schema\".\"post\" where id = $1", [post.id])];
                        case 4:
                            rows = _a.sent();
                            chai_1.expect(rows[0]["title"]).to.be.eq(post.title);
                            return [2 /*return*/];
                    }
                });
            }); }));
        });
    });
});
//# sourceMappingURL=connection.js.map