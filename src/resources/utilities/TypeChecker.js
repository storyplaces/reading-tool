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
"use strict";
var TypeChecker = (function () {
    function TypeChecker() {
    }
    TypeChecker.prototype.validateAsScalarOrUndefined = function (fieldName, value, scalarType) {
        if (value !== undefined && typeof value !== scalarType) {
            throw TypeError(fieldName + " must be a " + scalarType + ", a " + typeof value + " was passed.");
        }
    };
    TypeChecker.prototype.validateAsStringOrUndefined = function (fieldName, value) {
        this.validateAsScalarOrUndefined(fieldName, value, 'string');
    };
    TypeChecker.prototype.validateAsNumberOrUndefined = function (fieldName, value) {
        this.validateAsScalarOrUndefined(fieldName, value, 'number');
    };
    TypeChecker.prototype.validateAsBooleanOrUndefined = function (fieldName, value) {
        this.validateAsScalarOrUndefined(fieldName, value, 'boolean');
    };
    TypeChecker.prototype.validateAsObjectOrUndefined = function (fieldName, value, objectName, object) {
        if (value !== undefined && !(value instanceof object)) {
            throw TypeError(fieldName + " must be of type " + objectName);
        }
    };
    TypeChecker.prototype.validateScalarValue = function (fieldName, expected, actual) {
        if (expected !== actual) {
            throw TypeError(fieldName + " was expected to be " + expected + " but was " + actual);
        }
    };
    TypeChecker.prototype.validateAsObjectAndNotArray = function (fieldName, value) {
        this.validateAsObjectOrUndefined(fieldName, value, "Object", Object);
        if (Array.isArray(value)) {
            throw TypeError(fieldName + " was expected not to be an array");
        }
    };
    TypeChecker.prototype.isArrayOf = function (fieldName, value, itemType) {
        var _this = this;
        if (!Array.isArray(value)) {
            throw new TypeError(fieldName + " is not an array");
        }
        value.forEach(function (item) {
            _this.validateAsScalarOrUndefined(fieldName + " item", item, itemType);
        });
    };
    TypeChecker.prototype.isUndefinedOrArrayOf = function (fieldName, value, itemType) {
        if (value === undefined) {
            return;
        }
        this.isArrayOf(fieldName, value, itemType);
    };
    TypeChecker.prototype.isTimePatternString = function (fieldName, value) {
        if (value === undefined) {
            return;
        }
        this.validateAsStringOrUndefined(fieldName, value);
        var reg = new RegExp('^[0-9]{1,2}:[0-9]{2}$');
        if (!reg.test(value)) {
            throw TypeError("The contents of " + fieldName + " must be in the format HH:MM");
        }
    };
    return TypeChecker;
}());
exports.TypeChecker = TypeChecker;
