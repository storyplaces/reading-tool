"use strict";
var BaseModel = (function () {
    function BaseModel(typeChecker) {
        this.typeChecker = typeChecker;
    }
    Object.defineProperty(BaseModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this.typeChecker.validateAsStringOrUndefined("Id", id);
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    return BaseModel;
}());
exports.BaseModel = BaseModel;
