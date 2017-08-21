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
var Post_1 = require("./entity/Post");
var chai_1 = require("chai");
var PostStatus_1 = require("./model/PostStatus");
describe("github issues > #182 enums are not saved properly", function () {
    var connections;
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_utils_1.createTestingConnections({
                        entities: [__dirname + "/entity/*{.js,.ts}"],
                        schemaCreate: true,
                        dropSchemaOnConnection: true,
                        enabledDrivers: ["mysql"] // we can properly test lazy-relations only on one platform
                    })];
                case 1: return [2 /*return*/, connections = _a.sent()];
            }
        });
    }); });
    beforeEach(function () { return test_utils_1.reloadTestingDatabases(connections); });
    after(function () { return test_utils_1.closeTestingConnections(connections); });
    it("should persist successfully with enum values", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var post1, loadedPosts1, post2, loadedPosts2, post3, loadedPosts3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    post1 = new Post_1.Post();
                    post1.status = PostStatus_1.PostStatus.NEW;
                    post1.title = "Hello Post #1";
                    // persist
                    return [4 /*yield*/, connection.entityManager.persist(post1)];
                case 1:
                    // persist
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOne(Post_1.Post, { title: "Hello Post #1" })];
                case 2:
                    loadedPosts1 = _a.sent();
                    chai_1.expect(loadedPosts1).not.to.be.empty;
                    loadedPosts1.should.be.eql({
                        id: 1,
                        title: "Hello Post #1",
                        status: PostStatus_1.PostStatus.NEW
                    });
                    // remove persisted
                    return [4 /*yield*/, connection.entityManager.remove(post1)];
                case 3:
                    // remove persisted
                    _a.sent();
                    post2 = new Post_1.Post();
                    post2.status = PostStatus_1.PostStatus.ACTIVE;
                    post2.title = "Hello Post #1";
                    // persist
                    return [4 /*yield*/, connection.entityManager.persist(post2)];
                case 4:
                    // persist
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOne(Post_1.Post, { title: "Hello Post #1" })];
                case 5:
                    loadedPosts2 = _a.sent();
                    chai_1.expect(loadedPosts2).not.to.be.empty;
                    loadedPosts2.should.be.eql({
                        id: 2,
                        title: "Hello Post #1",
                        status: PostStatus_1.PostStatus.ACTIVE
                    });
                    // remove persisted
                    return [4 /*yield*/, connection.entityManager.remove(post2)];
                case 6:
                    // remove persisted
                    _a.sent();
                    post3 = new Post_1.Post();
                    post3.status = PostStatus_1.PostStatus.ACHIEVED;
                    post3.title = "Hello Post #1";
                    // persist
                    return [4 /*yield*/, connection.entityManager.persist(post3)];
                case 7:
                    // persist
                    _a.sent();
                    return [4 /*yield*/, connection.entityManager.findOne(Post_1.Post, { title: "Hello Post #1" })];
                case 8:
                    loadedPosts3 = _a.sent();
                    chai_1.expect(loadedPosts3).not.to.be.empty;
                    loadedPosts3.should.be.eql({
                        id: 3,
                        title: "Hello Post #1",
                        status: PostStatus_1.PostStatus.ACHIEVED
                    });
                    // remove persisted
                    return [4 /*yield*/, connection.entityManager.remove(post3)];
                case 9:
                    // remove persisted
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-182.js.map