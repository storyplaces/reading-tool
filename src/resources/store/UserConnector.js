/**
 * Created by andy on 29/11/16.
 */
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
var AbstractConnector_1 = require("./AbstractConnector");
var aurelia_framework_1 = require('aurelia-framework');
var StoryplacesAPI_1 = require("./StoryplacesAPI");
var StoryConnector = (function (_super) {
    __extends(StoryConnector, _super);
    function StoryConnector(storyCollection, storyplacesAPI) {
        _super.call(this);
        this.storyCollection = storyCollection;
        this.storyplacesAPI = storyplacesAPI;
        this.storyplacesAPI.path = "/story/";
    }
    Object.defineProperty(StoryConnector.prototype, "all", {
        get: function () {
            return this.storyCollection.all();
        },
        enumerable: true,
        configurable: true
    });
    StoryConnector.prototype.byId = function (id) {
        return this.storyCollection.get(id);
    };
    StoryConnector.prototype.fetchAll = function () {
        var _this = this;
        return this.storyplacesAPI.getAll().then(function (stories) {
            return stories.json().then(function (stories) {
                _this.storyCollection.saveMany(stories);
            });
        });
    };
    StoryConnector.prototype.fetchById = function (id) {
        var _this = this;
        return this.storyplacesAPI.getOne(id).then(function (story) {
            return story.json().then(function (story) {
                _this.storyCollection.save(story);
            });
        });
    };
    StoryConnector.prototype.save = function (object) {
        var _this = this;
        return this.storyplacesAPI.save(object).then(function (story) {
            return story.json().then(function (story) {
                _this.storyCollection.save(story);
            });
        });
    };
    StoryConnector.prototype.remove = function (id) {
        return new Promise(function (success) {
            return success(true);
        });
    };
    StoryConnector = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.NewInstance.of(UserCollection), aurelia_framework_1.NewInstance.of(StoryplacesAPI_1.StoryPlacesAPI))
    ], StoryConnector);
    return StoryConnector;
}(AbstractConnector_1.AbstractConnector));
exports.StoryConnector = StoryConnector;
