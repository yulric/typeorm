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
var index_1 = require("../../src/index");
/**
 * Creates a testing connection options for the given driver type based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
function setupSingleTestingConnection(driverType, options) {
    var testingConnections = setupTestingConnections({
        name: options.name ? options.name : undefined,
        entities: options.entities ? options.entities : [],
        entitySchemas: options.entitySchemas ? options.entitySchemas : [],
        dropSchemaOnConnection: options.dropSchemaOnConnection ? options.dropSchemaOnConnection : false,
        schemaCreate: options.schemaCreate ? options.schemaCreate : false,
        enabledDrivers: [driverType],
        schemaName: options.schemaName ? options.schemaName : undefined
    });
    if (!testingConnections.length)
        throw new Error("Unable to run tests because connection options for \"" + driverType + "\" are not set.");
    return testingConnections[0];
}
exports.setupSingleTestingConnection = setupSingleTestingConnection;
/**
 * Loads test connection options from ormconfig.json file.
 */
function getTypeOrmConfig() {
    try {
        try {
            return require(__dirname + "/../../../../ormconfig.json");
        }
        catch (err) {
            return require(__dirname + "/../../ormconfig.json");
        }
    }
    catch (err) {
        throw new Error("Cannot find ormconfig.json file in the root of the project. To run tests please create ormconfig.json file" +
            " in the root of the project (near ormconfig.json.dist, you need to copy ormconfig.json.dist into ormconfig.json" +
            " and change all database settings to match your local environment settings).");
    }
}
exports.getTypeOrmConfig = getTypeOrmConfig;
/**
 * Creates a testing connections options based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
function setupTestingConnections(options) {
    var ormConfigConnectionOptionsArray = getTypeOrmConfig();
    if (!ormConfigConnectionOptionsArray.length)
        throw new Error("No connections setup in ormconfig.json file. Please create configurations for each database type to run tests.");
    return ormConfigConnectionOptionsArray
        .filter(function (connectionOptions) {
        if (options && options.enabledDrivers && options.enabledDrivers.length)
            return options.enabledDrivers.indexOf(connectionOptions.driver.type) !== -1;
        return !connectionOptions.skip;
    })
        .map(function (connectionOptions) {
        var newConnectionOptions = Object.assign({}, connectionOptions, {
            name: options && options.name ? options.name : connectionOptions.name,
            entities: options && options.entities ? options.entities : [],
            entitySchemas: options && options.entitySchemas ? options.entitySchemas : [],
            autoSchemaSync: options && options.entities ? options.schemaCreate : false,
            dropSchemaOnConnection: options && options.entities ? options.dropSchemaOnConnection : false,
        });
        if (options && options.schemaName && newConnectionOptions.driver) {
            // todo: we use any because driver.schemaName is readonly. Need to find better solution here
            newConnectionOptions.driver.schemaName = options.schemaName;
        }
        return newConnectionOptions;
    });
}
exports.setupTestingConnections = setupTestingConnections;
/**
 * Creates a testing connections based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
function createTestingConnections(options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, index_1.createConnections(setupTestingConnections(options))];
        });
    });
}
exports.createTestingConnections = createTestingConnections;
/**
 * Closes testing connections if they are connected.
 */
function closeTestingConnections(connections) {
    return Promise.all(connections.map(function (connection) { return connection.isConnected ? connection.close() : undefined; }));
}
exports.closeTestingConnections = closeTestingConnections;
/**
 * Reloads all databases for all given connections.
 */
function reloadTestingDatabases(connections) {
    return Promise.all(connections.map(function (connection) { return connection.syncSchema(true); }));
}
exports.reloadTestingDatabases = reloadTestingDatabases;
/**
 * Setups connection.
 *
 * @deprecated Old method of creating connection. Don't use it anymore. Use createTestingConnections instead.
 */
function setupConnection(callback, entities) {
    return function () {
        return index_1.createConnection(setupSingleTestingConnection("mysql", { entities: entities }))
            .then(function (connection) {
            if (callback)
                callback(connection);
            return connection;
        });
    };
}
exports.setupConnection = setupConnection;
//# sourceMappingURL=test-utils.js.map