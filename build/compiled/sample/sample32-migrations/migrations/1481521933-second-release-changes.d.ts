import { MigrationInterface } from "../../../src/migration/MigrationInterface";
import { Connection } from "../../../src/connection/Connection";
import { QueryRunner } from "../../../src/query-runner/QueryRunner";
export declare class SecondReleaseMigration1481521933 implements MigrationInterface {
    up(queryRunner: QueryRunner, connection: Connection): Promise<any>;
    down(queryRunner: QueryRunner, connection: Connection): Promise<any>;
}
