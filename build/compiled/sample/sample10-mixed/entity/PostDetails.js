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
var index_1 = require("../../../src/index");
var Post_1 = require("./Post");
var Chapter_1 = require("./Chapter");
var Category_1 = require("./Category");
var PostDetails = (function () {
    function PostDetails() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PostDetails.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], PostDetails.prototype, "meta", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], PostDetails.prototype, "comment", void 0);
    __decorate([
        index_1.OneToOne(function (type) { return Post_1.Post; }, function (post) { return post.details; }),
        __metadata("design:type", Post_1.Post)
    ], PostDetails.prototype, "post", void 0);
    __decorate([
        index_1.OneToMany(function (type) { return Category_1.Category; }, function (category) { return category.details; }, {
            cascadeInsert: true
        }),
        __metadata("design:type", Array)
    ], PostDetails.prototype, "categories", void 0);
    __decorate([
        index_1.ManyToOne(function (type) { return Chapter_1.Chapter; }, function (chapter) { return chapter.postDetails; }, {
            cascadeInsert: true,
            cascadeRemove: true
        }),
        __metadata("design:type", Chapter_1.Chapter)
    ], PostDetails.prototype, "chapter", void 0);
    PostDetails = __decorate([
        index_1.Entity("sample10_post_details")
    ], PostDetails);
    return PostDetails;
}());
exports.PostDetails = PostDetails;
//# sourceMappingURL=PostDetails.js.map