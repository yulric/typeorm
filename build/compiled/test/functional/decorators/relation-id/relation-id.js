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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var chai = require("chai");
var chai_1 = require("chai");
var test_utils_1 = require("../../../utils/test-utils");
var Post_1 = require("./entity/Post");
var Category_1 = require("./entity/Category");
var Tag_1 = require("./entity/Tag");
var should = chai.should();
describe("QueryBuilder > relation-id", function () {
    // const resourceDir = __dirname + "/../../../../../../test/functional/query-builder/join-relation-ids/";
    // todo: make this feature to work with FindOptions
    // todo: also make sure all new qb features to work with FindOptions
    var connections;
    before(function () { return test_utils_1.createTestingConnections({ entities: [Post_1.Post, Category_1.Category, Tag_1.Tag], schemaCreate: true, dropSchemaOnConnection: true }).then(function (all) { return connections = all; }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    describe("basic functionality", function () {
        var _this = this;
        it("should load ids probably in all cases", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, categoryRepository, tagRepository, tag, category1, category2, post, emptyPost, loadedPost, loadedEmptyPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        categoryRepository = connection.getRepository(Category_1.Category);
                        tagRepository = connection.getRepository(Tag_1.Tag);
                        tag = new Tag_1.Tag();
                        tag.name = "kids";
                        category1 = new Category_1.Category();
                        category1.name = "kids";
                        category2 = new Category_1.Category();
                        category2.name = "future";
                        post = new Post_1.Post();
                        post.title = "about kids";
                        post.tag = tag;
                        post.categories = [category1, category2];
                        emptyPost = new Post_1.Post();
                        emptyPost.title = "second post";
                        return [4 /*yield*/, Promise.all([
                                postRepository.persist(emptyPost),
                                tagRepository.persist(tag),
                                categoryRepository.persist(category1),
                                categoryRepository.persist(category2)
                            ])];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, postRepository.persist(post)];
                    case 2:
                        _a.sent();
                        post.title.should.be.equal("about kids");
                        chai_1.expect(post.tag.id).to.not.be.empty;
                        // post.tagId.should.not.be.empty; // todo
                        chai_1.expect(post.categories[0].id).to.not.be.empty;
                        chai_1.expect(post.categories[1].id).to.not.be.empty;
                        return [4 /*yield*/, postRepository
                                .createQueryBuilder("post")
                                .leftJoinRelationId("post.categories")
                                .where("post.id = :id", { id: post.id })
                                .getOne()];
                    case 3:
                        loadedPost = (_a.sent());
                        chai_1.expect(loadedPost.tagId).to.not.be.empty;
                        chai_1.expect(loadedPost.tagId).to.be.equal(1);
                        chai_1.expect(loadedPost.categoryIds).to.not.be.empty;
                        chai_1.expect(loadedPost.categoryIds).to.contain(1);
                        chai_1.expect(loadedPost.categoryIds).to.contain(2);
                        return [4 /*yield*/, postRepository
                                .createQueryBuilder("post")
                                .leftJoinRelationId("post.categories")
                                .where("post.id = :id", { id: emptyPost.id })
                                .getOne()];
                    case 4:
                        loadedEmptyPost = (_a.sent());
                        should.not.exist(loadedEmptyPost.tagId);
                        should.not.exist(loadedEmptyPost.categoryIds);
                        return [4 /*yield*/, postRepository
                                .createQueryBuilder("post")
                                .innerJoinRelationId("post.categories")
                                .where("post.id = :id", { id: emptyPost.id })
                                .getOne()];
                    case 5:
                        loadedEmptyPost = (_a.sent());
                        should.not.exist(loadedEmptyPost);
                        return [4 /*yield*/, postRepository
                                .createQueryBuilder("post")
                                .leftJoinRelationIdAndMap("post.allCategoryIds", "post.categories")
                                .where("post.id = :id", { id: post.id })
                                .getOne()];
                    case 6:
                        loadedPost = (_a.sent());
                        loadedPost.allCategoryIds.should.contain(1);
                        loadedPost.allCategoryIds.should.contain(2);
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=relation-id.js.map