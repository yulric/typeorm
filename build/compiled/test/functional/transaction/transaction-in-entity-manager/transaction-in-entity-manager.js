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
var Category_1 = require("./entity/Category");
var chai_1 = require("chai");
describe("transaction > transaction with entity manager", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        schemaCreate: true,
                        dropSchemaOnConnection: true,
                        enabledDrivers: ["mysql", "sqlite", "postgres"] // todo: for some reasons mariadb tests are not passing here
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should execute all operations in a single transaction", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var postId, categoryId, post, category;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postId = undefined, categoryId = undefined;
                    return [4 /*yield*/, connection.entityManager.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var post, category;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        post = new Post_1.Post();
                                        post.title = "Post #1";
                                        return [4 /*yield*/, entityManager.persist(post)];
                                    case 1:
                                        _a.sent();
                                        category = new Category_1.Category();
                                        category.name = "Category #1";
                                        return [4 /*yield*/, entityManager.persist(category)];
                                    case 2:
                                        _a.sent();
                                        postId = post.id;
                                        categoryId = category.id;
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOne(Post_1.Post, { title: "Post #1" })];
                case 2:
                    post = _a.sent();
                    chai_1.expect(post).not.to.be.empty;
                    post.should.be.eql({
                        id: postId,
                        title: "Post #1"
                    });
                    return [4 /*yield*/, connection.entityManager.findOne(Category_1.Category, { name: "Category #1" })];
                case 3:
                    category = _a.sent();
                    chai_1.expect(category).not.to.be.empty;
                    category.should.be.eql({
                        id: categoryId,
                        name: "Category #1"
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should not save anything if any of operation in transaction fail", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var postId, categoryId, err_1, post, category;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postId = undefined, categoryId = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, connection.entityManager.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var post, category, loadedPost, loadedCategory, wrongPost;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        post = new Post_1.Post();
                                        post.title = "Post #1";
                                        return [4 /*yield*/, entityManager.persist(post)];
                                    case 1:
                                        _a.sent();
                                        category = new Category_1.Category();
                                        category.name = "Category #1";
                                        return [4 /*yield*/, entityManager.persist(category)];
                                    case 2:
                                        _a.sent();
                                        postId = post.id;
                                        categoryId = category.id;
                                        return [4 /*yield*/, entityManager.findOne(Post_1.Post, { title: "Post #1" })];
                                    case 3:
                                        loadedPost = _a.sent();
                                        chai_1.expect(loadedPost).not.to.be.empty;
                                        loadedPost.should.be.eql({
                                            id: postId,
                                            title: "Post #1"
                                        });
                                        return [4 /*yield*/, entityManager.findOne(Category_1.Category, { name: "Category #1" })];
                                    case 4:
                                        loadedCategory = _a.sent();
                                        chai_1.expect(loadedCategory).not.to.be.empty;
                                        loadedCategory.should.be.eql({
                                            id: categoryId,
                                            name: "Category #1"
                                        });
                                        wrongPost = new Post_1.Post();
                                        return [4 /*yield*/, entityManager.persist(wrongPost)];
                                    case 5:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, connection.entityManager.findOne(Post_1.Post, { title: "Post #1" })];
                case 5:
                    post = _a.sent();
                    chai_1.expect(post).to.be.empty;
                    return [4 /*yield*/, connection.entityManager.findOne(Category_1.Category, { name: "Category #1" })];
                case 6:
                    category = _a.sent();
                    chai_1.expect(category).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=transaction-in-entity-manager.js.map