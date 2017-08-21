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
var Index_1 = require("../../../src/decorator/Index");
var AbstractEntity_1 = require("../../../src/decorator/entity/AbstractEntity");
var BasePost = (function () {
    function BasePost() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], BasePost.prototype, "id", void 0);
    __decorate([
        index_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], BasePost.prototype, "text", void 0);
    __decorate([
        Index_1.Index(),
        index_1.Column(),
        __metadata("design:type", String)
    ], BasePost.prototype, "extra", void 0);
    BasePost = __decorate([
        AbstractEntity_1.AbstractEntity(),
        Index_1.Index("my_index_with_id_and_text", ["id", "text"])
    ], BasePost);
    return BasePost;
}());
exports.BasePost = BasePost;
//# sourceMappingURL=BasePost.js.map