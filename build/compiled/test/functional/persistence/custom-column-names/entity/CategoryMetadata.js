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
var Entity_1 = require("../../../../../src/decorator/entity/Entity");
var PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
var Column_1 = require("../../../../../src/decorator/columns/Column");
var OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
var Category_1 = require("./Category");
var CategoryMetadata = (function () {
    function CategoryMetadata() {
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], CategoryMetadata.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], CategoryMetadata.prototype, "keyword", void 0);
    __decorate([
        OneToOne_1.OneToOne(function (type) { return Category_1.Category; }, function (category) { return category.metadata; }),
        __metadata("design:type", Category_1.Category)
    ], CategoryMetadata.prototype, "category", void 0);
    CategoryMetadata = __decorate([
        Entity_1.Entity()
    ], CategoryMetadata);
    return CategoryMetadata;
}());
exports.CategoryMetadata = CategoryMetadata;
//# sourceMappingURL=CategoryMetadata.js.map