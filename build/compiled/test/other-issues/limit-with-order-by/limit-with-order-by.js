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
var Category_1 = require("./entity/Category");
describe("other issues > using limit in conjunction with order by", function () {
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
    it("should persist successfully and return persisted entity", function () { return Promise.all(connections.map(function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, i, post, i_1, category, loadedPosts1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        for (i = 1; i <= 100; i++) {
                            post = new Post_1.Post();
                            post.title = "Hello Post #" + i;
                            post.categories = [];
                            for (i_1 = 1; i_1 <= 5; i_1++) {
                                category = new Category_1.Category();
                                category.name = "category #" + i_1;
                                post.categories.push(category);
                            }
                            promises.push(connection.entityManager.persist(post));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, connection.entityManager
                                .createQueryBuilder(Post_1.Post, "post")
                                .innerJoinAndSelect("post.categories", "categories")
                                .setMaxResults(10)
                                .orderBy("post.id", "DESC")
                                .getMany()];
                    case 2:
                        loadedPosts1 = _a.sent();
                        chai_1.expect(loadedPosts1).not.to.be.empty;
                        loadedPosts1.length.should.be.equal(10);
                        loadedPosts1[0].id.should.be.equal(100);
                        loadedPosts1[1].id.should.be.equal(99);
                        loadedPosts1[2].id.should.be.equal(98);
                        loadedPosts1[3].id.should.be.equal(97);
                        loadedPosts1[4].id.should.be.equal(96);
                        loadedPosts1[5].id.should.be.equal(95);
                        loadedPosts1[6].id.should.be.equal(94);
                        loadedPosts1[7].id.should.be.equal(93);
                        loadedPosts1[8].id.should.be.equal(92);
                        loadedPosts1[9].id.should.be.equal(91);
                        return [2 /*return*/];
                }
            });
        });
    })); });
});
//# sourceMappingURL=limit-with-order-by.js.map