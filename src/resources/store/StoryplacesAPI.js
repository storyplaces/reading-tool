/**
 * Created by andy on 25/11/16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require('aurelia-framework');
var StoryPlacesAPI = (function () {
    function StoryPlacesAPI(client, config) {
        var _this = this;
        this.client = client;
        this.config = config;
        var headers = {};
        headers['X-Auth-Token'] = this.config.read('server_auth_password');
        headers['Content-Type'] = "application/json";
        this.client.configure(function (config) {
            // TODO: Put these in a config file
            config
                .withBaseUrl(_this.config.read('server'))
                .withDefaults({
                headers: headers
            });
        });
    }
    Object.defineProperty(StoryPlacesAPI.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (path) {
            // Add the trailing / if there is not one already
            if (path.slice(-1) == "/") {
                this._path = path;
            }
            else {
                this._path = path.concat("/");
            }
        },
        enumerable: true,
        configurable: true
    });
    StoryPlacesAPI.prototype.getAll = function () {
        return this.client.fetch(this._path);
    };
    StoryPlacesAPI.prototype.getOne = function (id) {
        return this.client.fetch(this._path + id);
    };
    StoryPlacesAPI.prototype.save = function (object) {
        var method;
        if (typeof object.id !== 'undefined') {
            method = 'put';
        }
        else {
            method = 'post';
        }
        return this.client.fetch(this._path, {
            method: method,
            body: JSON.stringify(object)
        });
    };
    StoryPlacesAPI = __decorate([
        aurelia_framework_1.autoinject()
    ], StoryPlacesAPI);
    return StoryPlacesAPI;
}());
exports.StoryPlacesAPI = StoryPlacesAPI;
