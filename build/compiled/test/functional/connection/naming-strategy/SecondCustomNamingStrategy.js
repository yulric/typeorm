"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
var NamingStrategy_1 = require("../../../../src/decorator/NamingStrategy");
var SecondCustomNamingStrategy = (function (_super) {
    __extends(SecondCustomNamingStrategy, _super);
    function SecondCustomNamingStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondCustomNamingStrategy.prototype.tableName = function (className, customName) {
        return customName ? customName.toLowerCase() : className.toLowerCase();
    };
    SecondCustomNamingStrategy = __decorate([
        NamingStrategy_1.NamingStrategy("secondCustomNamingStrategy")
    ], SecondCustomNamingStrategy);
    return SecondCustomNamingStrategy;
}(DefaultNamingStrategy_1.DefaultNamingStrategy));
exports.SecondCustomNamingStrategy = SecondCustomNamingStrategy;
//# sourceMappingURL=SecondCustomNamingStrategy.js.map