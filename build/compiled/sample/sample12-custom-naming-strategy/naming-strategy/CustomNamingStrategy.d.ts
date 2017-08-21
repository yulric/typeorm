import { NamingStrategyInterface } from "../../../src/naming-strategy/NamingStrategyInterface";
import { DefaultNamingStrategy } from "../../../src/naming-strategy/DefaultNamingStrategy";
export declare class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName(className: string, customName: string): string;
    columnName(propertyName: string, customName: string): string;
    columnNameCustomized(customName: string): string;
    relationName(propertyName: string): string;
}
