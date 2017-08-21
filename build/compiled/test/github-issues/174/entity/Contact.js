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
var Column_1 = require("../../../../src/decorator/columns/Column");
var EmbeddableEntity_1 = require("../../../../src/decorator/entity/EmbeddableEntity");
var Contact = (function () {
    function Contact() {
    }
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Contact.prototype, "name", void 0);
    __decorate([
        Column_1.Column(),
        __metadata("design:type", String)
    ], Contact.prototype, "email", void 0);
    Contact = __decorate([
        EmbeddableEntity_1.EmbeddableEntity()
    ], Contact);
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map