import {BaseConnectionOptions} from "../../connection/BaseConnectionOptions";

/**
 * MySQL specific connection options.
 *
 * @see https://github.com/mysqljs/mysql#connection-options
 */
export interface MysqlConnectionOptions extends BaseConnectionOptions {

    /**
     * Database type.
     */
    readonly type: "mysql"|"mariadb";

    /**
     * Connection url where perform connection to.
     */
    readonly url?: string;

    /**
     * Database host.
     */
    readonly host?: string;

    /**
     * Database host port.
     */
    readonly port?: number;

    /**
     * Database username.
     */
    readonly username?: string;

    /**
     * Database password.
     */
    readonly password?: string;

    /**
     * Database name to connect to.
     */
    readonly database?: string;

    /**
     * The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci).
     * If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used.
     * Default: 'UTF8_GENERAL_CI'
     */
    readonly charset?: string;

    /**
     * The timezone configured on the MySQL server.
     * This is used to type cast server date/time values to JavaScript Date object and vice versa.
     * This can be 'local', 'Z', or an offset in the form +HH:MM or -HH:MM. (Default: 'local')
     */
    readonly timezone?: string;

    /**
     * The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
     */
    readonly connectTimeout?: number;

    /**
     * Allow connecting to MySQL instances that ask for the old (insecure) authentication method. (Default: false)
     */
    readonly insecureAuth?: boolean;

    /**
     * When dealing with big numbers (BIGINT and DECIMAL columns) in the database, you should enable this option (Default: false)
     */
    readonly supportBigNumbers?: boolean;

    /**
     * Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns) to be always
     * returned as JavaScript String objects (Default: false). Enabling supportBigNumbers but leaving bigNumberStrings
     * disabled will return big numbers as String objects only when they cannot be accurately represented with
     * [JavaScript Number objects](http://ecma262-5.com/ELS5_HTML.htm#Section_8.5) (which happens when they exceed the [-2^53, +2^53] range),
     * otherwise they will be returned as Number objects. This option is ignored if supportBigNumbers is disabled.
     */
    readonly bigNumberStrings?: boolean;

    /**
     * Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date objects.
     * Can be true/false or an array of type names to keep as strings.
     */
    readonly dateStrings?: boolean|string[];

    /**
     * Prints protocol details to stdout. Can be true/false or an array of packet type names that should be printed.
     * (Default: false)
     */
    readonly debug?: boolean|string[];

    /**
     * Generates stack traces on Error to include call site of library entrance ("long stack traces").
     * Slight performance penalty for most calls. (Default: true)
     */
    readonly trace?: boolean;

    /**
     * Allow multiple mysql statements per query. Be careful with this, it could increase the scope of SQL injection attacks.
     * (Default: false)
     */
    readonly multipleStatements?: boolean;

    /**
     * List of connection flags to use other than the default ones. It is also possible to blacklist default ones.
     * For more information, check https://github.com/mysqljs/mysql#connection-flags.
     */
    readonly flags?: string[];

    /**
     * Object with ssl parameters or a string containing name of ssl profile.
     */
    readonly ssl?: any;

}