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
var Game_1 = require("./entity/Game");
var Platform_1 = require("./entity/Platform");
var chai_1 = require("chai");
describe("github issues > #163 ManyToMany relation : Cannot read property 'joinColumnName' of undefined", function () {
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
    it("should persist class table child successfully", function () { return Promise.all(connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
        var battlefront, republicCommando, platform, loadedPlatform, jediAcademy, completePlatform;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    battlefront = new Game_1.Game();
                    battlefront.name = "SW Battlefront";
                    battlefront.searchTerms = "star-wars,arcade";
                    battlefront.isReviewed = false;
                    republicCommando = new Game_1.Game();
                    republicCommando.name = "SW Republic Commando";
                    republicCommando.searchTerms = "star-wars,shooter";
                    republicCommando.isReviewed = false;
                    platform = new Platform_1.Platform();
                    platform.name = "Windows";
                    platform.slug = "windows";
                    platform.games = [battlefront, republicCommando];
                    return [4 /*yield*/, connection.entityManager.persist(platform)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .getRepository(Platform_1.Platform)
                            .findOne({ slug: "windows" })];
                case 2:
                    loadedPlatform = _a.sent();
                    jediAcademy = new Game_1.Game();
                    jediAcademy.name = "SW Jedi Academy";
                    jediAcademy.searchTerms = "star-wars,arcade";
                    jediAcademy.platforms = [loadedPlatform];
                    jediAcademy.isReviewed = false;
                    return [4 /*yield*/, connection.entityManager.persist(jediAcademy)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, connection
                            .getRepository(Platform_1.Platform)
                            .createQueryBuilder("platform")
                            .leftJoinAndSelect("platform.games", "games")
                            .where("platform.slug=:slug", { slug: "windows" })
                            .getOne()];
                case 4:
                    completePlatform = _a.sent();
                    chai_1.expect(completePlatform).not.to.be.empty;
                    completePlatform.should.be.eql({
                        id: platform.id,
                        name: "Windows",
                        slug: "windows",
                        games: [{
                                id: battlefront.id,
                                name: "SW Battlefront",
                                searchTerms: "star-wars,arcade",
                                isReviewed: false
                            }, {
                                id: republicCommando.id,
                                name: "SW Republic Commando",
                                searchTerms: "star-wars,shooter",
                                isReviewed: false
                            }, {
                                id: jediAcademy.id,
                                name: "SW Jedi Academy",
                                searchTerms: "star-wars,arcade",
                                isReviewed: false
                            }]
                    });
                    return [2 /*return*/];
            }
        });
    }); })); });
});
//# sourceMappingURL=issue-163.js.map