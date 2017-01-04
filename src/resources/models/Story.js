"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) 2016
 University of Southampton
 Charlie Hargood, cah07r.ecs.soton.ac.uk
 Kevin Puplett, k.e.puplett.soton.ac.uk
 David Pepper, d.pepper.soton.ac.uk

 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * The name of the University of Southampton nor the name of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var PageCollection_1 = require("../collections/PageCollection");
var PagesMapViewSettings_1 = require("./PagesMapViewSettings");
var aurelia_framework_1 = require("aurelia-framework");
var BaseModel_1 = require("./BaseModel");
var TypeChecker_1 = require("../utilities/TypeChecker");
var LocationCollection_1 = require("../collections/LocationCollection");
var Story = (function (_super) {
    __extends(Story, _super);
    function Story(pageCollectionFactory, pagesMapViewSettingsFactory, locationCollectionFactory, typeChecker, data) {
        _super.call(this, typeChecker);
        this.pageCollectionFactory = pageCollectionFactory;
        this.pagesMapViewSettingsFactory = pagesMapViewSettingsFactory;
        this.locationCollectionFactory = locationCollectionFactory;
        this.fromObject(data);
    }
    Story.prototype.fromObject = function (data) {
        if (data === void 0) { data = {
            id: undefined,
            name: undefined,
            pages: undefined,
            cachedMediaIds: undefined,
            conditions: undefined,
            pagesMapViewSettings: undefined,
            functions: undefined,
            tags: undefined,
            author: undefined,
            description: undefined,
            audience: undefined,
            locations: undefined,
        }; }
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.author = data.author;
        this.cachedMediaIds = data.cachedMediaIds;
        this.conditions = data.conditions;
        this.description = data.description;
        this.functions = data.functions;
        this.pages = this.pageCollectionFactory(data.pages);
        this.pagesMapViewSettings = this.pagesMapViewSettingsFactory(data.pagesMapViewSettings);
        this.name = data.name;
        this.tags = data.tags;
        this.audience = data.audience;
        this.locations = this.locationCollectionFactory(data.locations);
    };
    Story.prototype.toJSON = function () {
        return {
            id: this.id,
            author: this.author,
            cachedMediaIds: this.cachedMediaIds,
            conditions: this.conditions,
            description: this.description,
            functions: this.functions,
            pages: this.pages,
            pagesMapViewSettings: this.pagesMapViewSettings,
            name: this.name,
            tags: this.tags,
            audience: this.audience,
            locations: this.locations,
        };
    };
    Object.defineProperty(Story.prototype, "audience", {
        get: function () {
            return this._audience;
        },
        set: function (value) {
            this.typeChecker.validateAsStringOrUndefined("Audience", value);
            this._audience = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "author", {
        get: function () {
            return this._author;
        },
        set: function (author) {
            this.typeChecker.validateAsStringOrUndefined('Author', author);
            this._author = author;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this.typeChecker.validateAsStringOrUndefined('Name', name);
            this._name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this.typeChecker.validateAsStringOrUndefined('Description', description);
            this._description = description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "pagesMapViewSettings", {
        get: function () {
            return this._pagesMapViewSettings;
        },
        set: function (pagesMapViewSettings) {
            this.typeChecker.validateAsObjectOrUndefined("PagesMapViewSettings", pagesMapViewSettings, "PagesMapViewSettings", PagesMapViewSettings_1.PagesMapViewSettings);
            this._pagesMapViewSettings = pagesMapViewSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        set: function (pages) {
            this.typeChecker.validateAsObjectOrUndefined("Pages", pages, "PageCollection", PageCollection_1.PageCollection);
            this._pages = pages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        set: function (value) {
            this._tags = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "functions", {
        get: function () {
            return this._functions;
        },
        set: function (value) {
            this._functions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "conditions", {
        get: function () {
            return this._conditions;
        },
        set: function (value) {
            this._conditions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "cachedMediaIds", {
        get: function () {
            return this._cachedMediaIds;
        },
        set: function (value) {
            this._cachedMediaIds = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Story.prototype, "locations", {
        get: function () {
            return this._locations;
        },
        set: function (value) {
            this.typeChecker.validateAsObjectOrUndefined("Locations", value, "LocationCollection", LocationCollection_1.LocationCollection);
            this._locations = value;
        },
        enumerable: true,
        configurable: true
    });
    Story = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.Factory.of(PageCollection_1.PageCollection), aurelia_framework_1.Factory.of(PagesMapViewSettings_1.PagesMapViewSettings), aurelia_framework_1.Factory.of(LocationCollection_1.LocationCollection), TypeChecker_1.TypeChecker)
    ], Story);
    return Story;
}(BaseModel_1.BaseModel));
exports.Story = Story;
