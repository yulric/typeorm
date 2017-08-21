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
var Category_1 = require("./Category");
var ManyToMany_1 = require("../../../../../src/decorator/relations/ManyToMany");
var JoinTable_1 = require("../../../../../src/decorator/relations/JoinTable");
var Blog = (function () {
    function Blog() {
        this.counter = 0;
    }
    __decorate([
        PrimaryGeneratedColumn_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Blog.prototype, "id", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Blog.prototype, "title", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Blog.prototype, "text", void 0);
    __decorate([
        ManyToMany_1.ManyToMany(function (type) { return Category_1.Category; }),
        JoinTable_1.JoinTable(),
        __metadata("design:type", Array)
    ], Blog.prototype, "categories", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", Number)
    ], Blog.prototype, "counter", void 0);
    Blog = __decorate([
        Entity_1.Entity()
    ], Blog);
    return Blog;
}());
exports.Blog = Blog;
//# sourceMappingURL=Blog.js.map