import { ConnectionOptions } from "../../src/connection/ConnectionOptions";
import { Connection } from "../../src/connection/Connection";
import { DriverType } from "../../src/driver/DriverOptions";
import { EntitySchema } from "../../src/entity-schema/EntitySchema";
/**
 * Interface in which data is stored in ormconfig.json of the project.
 */
export interface TestingConnectionOptions extends ConnectionOptions {
    /**
     * Indicates if this connection should be skipped.
     */
    skip: boolean;
}
/**
 * Options used to create a connection for testing purposes.
 */
export interface TestingOptions {
    /**
     * Connection name to be overridden.
     * This can be used to create multiple connections with single connection configuration.
     */
    name?: string;
    /**
     * List of enabled drivers for the given test suite.
     */
    enabledDrivers?: DriverType[];
    /**
     * Entities needs to be included in the connection for the given test suite.
     */
    entities?: string[] | Function[];
    /**
     * Entity schemas needs to be included in the connection for the given test suite.
     */
    entitySchemas?: EntitySchema[];
    /**
     * Indicates if schema sync should be performed or not.
     */
    schemaCreate?: boolean;
    /**
     * Indicates if schema should be dropped on connection setup.
     */
    dropSchemaOnConnection?: boolean;
    /**
     * Schema name used for postgres driver.
     */
    schemaName?: string;
}
/**
 * Creates a testing connection options for the given driver type based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
export declare function setupSingleTestingConnection(driverType: DriverType, options: TestingOptions): ConnectionOptions & {
    name: string | undefined;
    entities: string[] | Function[];
    entitySchemas: EntitySchema[];
    autoSchemaSync: boolean | undefined;
    dropSchemaOnConnection: boolean | undefined;
};
/**
 * Loads test connection options from ormconfig.json file.
 */
export declare function getTypeOrmConfig(): TestingConnectionOptions[];
/**
 * Creates a testing connections options based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
export declare function setupTestingConnections(options?: TestingOptions): (ConnectionOptions & {
    name: string | undefined;
    entities: string[] | Function[];
    entitySchemas: EntitySchema[];
    autoSchemaSync: boolean | undefined;
    dropSchemaOnConnection: boolean | undefined;
})[];
/**
 * Creates a testing connections based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
export declare function createTestingConnections(options?: TestingOptions): Promise<Connection[]>;
/**
 * Closes testing connections if they are connected.
 */
export declare function closeTestingConnections(connections: Connection[]): Promise<void[]>;
/**
 * Reloads all databases for all given connections.
 */
export declare function reloadTestingDatabases(connections: Connection[]): Promise<void[]>;
/**
 * Setups connection.
 *
 * @deprecated Old method of creating connection. Don't use it anymore. Use createTestingConnections instead.
 */
export declare function setupConnection(callback: (connection: Connection) => any, entities: Function[]): () => Promise<Connection>;
