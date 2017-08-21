import { MigrationInterface } from "../../../src/migration/MigrationInterface";
import { Connection } from "../../../src/connection/Connection";
import { QueryRunner } from "../../../src/query-runner/QueryRunner";
export declare class FirstReleaseMigration1481283582 implements MigrationInterface {
    up(queryRunner: QueryRunner, connection: Connection): Promise<any>;
    down(queryRunner: QueryRunner, connection: Connection): Promise<any>;
}