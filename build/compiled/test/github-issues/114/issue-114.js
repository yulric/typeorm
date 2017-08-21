"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var PostgresDriver_1 = require("../../../src/driver/postgres/PostgresDriver");
var Logger_1 = require("../../../src/logger/Logger");
var chai_1 = require("chai");
describe("github issues > #114 Can not be parsed correctly the URL of pg.", function () {
    var driver;
    before(function () { return driver = new PostgresDriver_1.PostgresDriver({
        type: "postgres",
        url: "postgres://test:test@localhost:5432/test",
    }, new Logger_1.Logger({})); });
    it("should not fail in url parser", function () {
        chai_1.expect(driver.options.username).to.be.eq("test");
        chai_1.expect(driver.options.password).to.be.eq("test");
        chai_1.expect(driver.options.host).to.be.eq("localhost");
        chai_1.expect(driver.options.port).to.be.eq(5432);
        chai_1.expect(driver.options.database).to.be.eq("test");
    });
});
//# sourceMappingURL=issue-114.js.map