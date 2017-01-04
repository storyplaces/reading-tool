"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../BaseModel");
var BaseLocation = (function (_super) {
    __extends(BaseLocation, _super);
    function BaseLocation(typeChecker) {
        _super.call(this, typeChecker);
    }
    Object.defineProperty(BaseLocation.prototype, "type", {
        get: function () { },
        set: function (value) { },
        enumerable: true,
        configurable: true
    });
    return BaseLocation;
}(BaseModel_1.BaseModel));
exports.BaseLocation = BaseLocation;
