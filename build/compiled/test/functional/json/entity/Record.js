"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../src/decorator/columns/Column");
/**
 * For testing Postgres jsonb
 */
var Record = (function () {
    function Record() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Record.prototype, "id", void 0);
    __decorate([
        Column_1.Column({ type: "json", nullable: true }),
        __metadata("design:type", Object)
    ], Record.prototype, "config", void 0);
    __decorate([
        Column_1.Column({ type: "jsonb", nullable: true }),
        __metadata("design:type", Object)
    ], Record.prototype, "data", void 0);
    Record = __decorate([
        Entity_1.Entity()
    ], Record);
    return Record;
}());
exports.Record = Record;
//# sourceMappingURL=Record.js.map