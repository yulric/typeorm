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
var Post_1 = require("./entity/Post");
var Counters_1 = require("./entity/Counters");
var chai_1 = require("chai");
var test_utils_1 = require("../../utils/test-utils");
describe("embedded > basic functionality", function () {
    var connections;
    beforeEach(function () { return test_utils_1.createTestingConnections({
        entities: [Post_1.Post, Counters_1.Counters]
    }).then(function (all) { return connections = all; }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    afterEach(function () { return test_utils_1.closeTestingConnections(connections); });
    describe("basic functionality", function () {
        var _this = this;
        it("should insert, load, update and remove entities with embeddeds properly", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
            var postRepository, post, loadedPost, loadedPost2, loadedPost3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postRepository = connection.getRepository(Post_1.Post);
                        post = new Post_1.Post();
                        post.title = "Hello post";
                        post.text = "This is text about the post";
                        post.counters = new Counters_1.Counters();
                        post.counters.comments = 5;
                        post.counters.favorites = 2;
                        post.counters.likes = 1;
                        return [4 /*yield*/, postRepository.persist(post)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, postRepository.findOneById(1)];
                    case 2:
                        loadedPost = (_a.sent());
                        loadedPost.id.should.be.equal(1);
                        loadedPost.title.should.be.equal("Hello post");
                        loadedPost.text.should.be.equal("This is text about the post");
                        loadedPost.counters.should.be.eql({
                            comments: 5,
                            favorites: 2,
                            likes: 1
                        });
                        // now update the post
                        loadedPost.counters.favorites += 1;
                        return [4 /*yield*/, postRepository.persist(loadedPost)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, postRepository.findOneById(1)];
                    case 4:
                        loadedPost2 = (_a.sent());
                        loadedPost2.id.should.be.equal(1);
                        loadedPost2.title.should.be.equal("Hello post");
                        loadedPost2.text.should.be.equal("This is text about the post");
                        loadedPost2.counters.should.be.eql({
                            comments: 5,
                            favorites: 3,
                            likes: 1
                        });
                        return [4 /*yield*/, postRepository.remove(loadedPost2)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, postRepository.findOneById(1)];
                    case 6:
                        loadedPost3 = (_a.sent());
                        chai_1.expect(loadedPost3).to.be.undefined;
                        return [2 /*return*/];
                }
            });
        }); })); });
    });
});
//# sourceMappingURL=embedded.js.map