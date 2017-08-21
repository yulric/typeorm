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
var test_utils_1 = require("../../utils/test-utils");
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var PostMetadata_1 = require("./entity/PostMetadata");
describe("github issues > #151 joinAndSelect can't find entity from inverse side of relation", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        schemaCreate: true,
                        dropSchemaOnConnection: true,
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should cascade persist successfully", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category, post, loadedPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category = new Category_1.Category();
                    category.name = "post category";
                    post = new Post_1.Post();
                    post.title = "Hello post";
                    post.category = category;
                    return [4 /*yield*/, connection.entityManager.persist(post)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOneById(Post_1.Post, 1, {
                            alias: "post",
                            innerJoinAndSelect: {
                                category: "post.category"
                            }
                        })];
                case 2:
                    loadedPost = _a.sent();
                    chai_1.expect(loadedPost).not.to.be.empty;
                    loadedPost.should.be.eql({
                        id: 1,
                        title: "Hello post",
                        category: {
                            id: 1,
                            name: "post category"
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should cascade remove successfully with uni-directional relation", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var category, post, loadedPostWithCategory, loadedPostWithoutCategory, loadedCategory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    category = new Category_1.Category();
                    category.name = "post category";
                    post = new Post_1.Post();
                    post.title = "Hello post";
                    post.category = category;
                    return [4 /*yield*/, connection.entityManager.persist(post)];
                case 1:
                    _a.sent();
                    post.category = null;
                    return [4 /*yield*/, connection.entityManager.persist(post)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOneById(Post_1.Post, 1, {
                            alias: "post",
                            innerJoinAndSelect: {
                                category: "post.category"
                            }
                        })];
                case 3:
                    loadedPostWithCategory = _a.sent();
                    chai_1.expect(loadedPostWithCategory).to.be.empty;
                    return [4 /*yield*/, connection.entityManager.findOneById(Post_1.Post, 1, {
                            alias: "post"
                        })];
                case 4:
                    loadedPostWithoutCategory = _a.sent();
                    chai_1.expect(loadedPostWithoutCategory).not.to.be.empty;
                    loadedPostWithoutCategory.should.be.eql({
                        id: 1,
                        title: "Hello post"
                    });
                    return [4 /*yield*/, connection.entityManager.findOneById(Category_1.Category, 1)];
                case 5:
                    loadedCategory = _a.sent();
                    chai_1.expect(loadedCategory).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("should cascade remove successfully with bi-directional relation from owner side", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var metadata, post, loadedPostWithMetadata, loadedPostWithoutMetadata, loadedMetadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadata = new PostMetadata_1.PostMetadata();
                    metadata.name = "post metadata";
                    post = new Post_1.Post();
                    post.title = "Hello post";
                    post.metadata = metadata;
                    return [4 /*yield*/, connection.entityManager.persist(post)];
                case 1:
                    _a.sent();
                    post.metadata = null;
                    return [4 /*yield*/, connection.entityManager.persist(post)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOneById(Post_1.Post, 1, {
                            alias: "post",
                            innerJoinAndSelect: {
                                metadata: "post.metadata"
                            }
                        })];
                case 3:
                    loadedPostWithMetadata = _a.sent();
                    chai_1.expect(loadedPostWithMetadata).to.be.empty;
                    return [4 /*yield*/, connection.entityManager.findOneById(Post_1.Post, 1, {
                            alias: "post"
                        })];
                case 4:
                    loadedPostWithoutMetadata = _a.sent();
                    chai_1.expect(loadedPostWithoutMetadata).not.to.be.empty;
                    loadedPostWithoutMetadata.should.be.eql({
                        id: 1,
                        title: "Hello post"
                    });
                    return [4 /*yield*/, connection.entityManager.findOneById(PostMetadata_1.PostMetadata, 1)];
                case 5:
                    loadedMetadata = _a.sent();
                    chai_1.expect(loadedMetadata).to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-151.js.map