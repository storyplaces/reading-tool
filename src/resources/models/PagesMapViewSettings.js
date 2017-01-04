"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TypeChecker_1 = require("../utilities/TypeChecker");
var aurelia_framework_1 = require("aurelia-framework");
var PagesMapViewSettings = (function () {
    function PagesMapViewSettings(typeChecker, data) {
        this.typeChecker = typeChecker;
        this.fromObject(data);
    }
    PagesMapViewSettings.prototype.fromObject = function (data) {
        if (data === void 0) { data = { map: undefined, pageArrows: undefined, pageDistance: undefined }; }
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.map = data.map;
        this.pageArrows = data.pageArrows;
        this.pageDistance = data.pageDistance;
    };
    PagesMapViewSettings.prototype.toJSON = function () {
        return {
            map: this.map,
            pageArrows: this.pageArrows,
            pageDistance: this.pageDistance
        };
    };
    Object.defineProperty(PagesMapViewSettings.prototype, "map", {
        get: function () {
            return this._map;
        },
        set: function (value) {
            this.typeChecker.validateAsBooleanOrUndefined("Map", value);
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagesMapViewSettings.prototype, "pageDistance", {
        get: function () {
            return this._pageDistance;
        },
        set: function (value) {
            this.typeChecker.validateAsBooleanOrUndefined("PageDistance", value);
            this._pageDistance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagesMapViewSettings.prototype, "pageArrows", {
        get: function () {
            return this._pageArrows;
        },
        set: function (value) {
            this.typeChecker.validateAsBooleanOrUndefined("PageArrows", value);
            this._pageArrows = value;
        },
        enumerable: true,
        configurable: true
    });
    PagesMapViewSettings = __decorate([
        aurelia_framework_1.inject(TypeChecker_1.TypeChecker)
    ], PagesMapViewSettings);
    return PagesMapViewSettings;
}());
exports.PagesMapViewSettings = PagesMapViewSettings;
