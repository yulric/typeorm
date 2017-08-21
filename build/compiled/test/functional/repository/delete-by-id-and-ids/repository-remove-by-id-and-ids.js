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
var chai_1 = require("chai");
var Post_1 = require("./entity/Post");
var test_utils_1 = require("../../../utils/test-utils");
describe("repository > removeById and removeByIds methods", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    var _this = this;
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        schemaCreate: true,
                        dropSchemaOnConnection: true
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("remove using removeById method should delete successfully", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, specificPostRepository, newPost1, newPost2, newPost3, newPost4, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    specificPostRepository = connection.getSpecificRepository(Post_1.Post);
                    newPost1 = postRepository.create();
                    newPost1.title = "Super post #1";
                    newPost2 = postRepository.create();
                    newPost2.title = "Super post #2";
                    newPost3 = postRepository.create();
                    newPost3.title = "Super post #3";
                    newPost4 = postRepository.create();
                    newPost4.title = "Super post #4";
                    return [4 /*yield*/, Promise.all([
                            postRepository.persist(newPost1),
                            postRepository.persist(newPost2),
                            postRepository.persist(newPost3),
                            postRepository.persist(newPost4)
                        ])];
                case 1:
                    _a.sent();
                    // remove one
                    return [4 /*yield*/, specificPostRepository.removeById(1)];
                case 2:
                    // remove one
                    _a.sent();
                    return [4 /*yield*/, postRepository.find()];
                case 3:
                    loadedPosts = _a.sent();
                    // assert
                    loadedPosts.length.should.be.equal(3);
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 1; })).to.be.empty;
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 2; })).not.to.be.empty;
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 3; })).not.to.be.empty;
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 4; })).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
    it("remove using removeByIds method should delete successfully", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var postRepository, specificPostRepository, newPost1, newPost2, newPost3, newPost4, loadedPosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postRepository = connection.getRepository(Post_1.Post);
                    specificPostRepository = connection.getSpecificRepository(Post_1.Post);
                    newPost1 = postRepository.create();
                    newPost1.title = "Super post #1";
                    newPost2 = postRepository.create();
                    newPost2.title = "Super post #2";
                    newPost3 = postRepository.create();
                    newPost3.title = "Super post #3";
                    newPost4 = postRepository.create();
                    newPost4.title = "Super post #4";
                    return [4 /*yield*/, Promise.all([
                            postRepository.persist(newPost1),
                            postRepository.persist(newPost2),
                            postRepository.persist(newPost3),
                            postRepository.persist(newPost4)
                        ])];
                case 1:
                    _a.sent();
                    // remove multiple
                    return [4 /*yield*/, specificPostRepository.removeByIds([2, 3])];
                case 2:
                    // remove multiple
                    _a.sent();
                    return [4 /*yield*/, postRepository.find()];
                case 3:
                    loadedPosts = _a.sent();
                    // assert
                    loadedPosts.length.should.be.equal(2);
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 1; })).not.to.be.empty;
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 2; })).to.be.empty;
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 3; })).to.be.empty;
                    chai_1.expect(loadedPosts.find(function (p) { return p.id === 4; })).not.to.be.empty;
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=repository-remove-by-id-and-ids.js.map