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
var Counters_1 = require("./Counters");
var Embedded_1 = require("../../../src/decorator/Embedded");
var Question = (function () {
    function Question() {
    }
    __decorate([
        index_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Question.prototype, "id", void 0);
    __decorate([
        index_1.Column(),
        __metadata("design:type", String)
    ], Question.prototype, "title", void 0);
    __decorate([
        Embedded_1.Embedded(function (type) { return Counters_1.Counters; }),
        __metadata("design:type", Counters_1.Counters)
    ], Question.prototype, "counters", void 0);
    Question = __decorate([
        index_1.Entity("sample26_question")
    ], Question);
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map