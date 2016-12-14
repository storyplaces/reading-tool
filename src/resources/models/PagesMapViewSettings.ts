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
import {JSONable} from "../interfaces/JSONable";
import {FromObjectInterface} from "../interfaces/FromObjectInterface";
import {TypeChecker} from "../utilities/TypeChecker";
import {inject} from "aurelia-framework";

@inject(TypeChecker)
export class PagesMapViewSettings implements JSONable, FromObjectInterface {

    private _map: boolean;
    private _pageDistance: boolean;
    private _pageArrows: boolean;

    constructor(private typeChecker: TypeChecker, data?: any) {
        this.fromObject(data);
    }

    public fromObject(data: any = {map: undefined, pageArrows: undefined, pageDistance: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.map = data.map;
        this.pageArrows = data.pageArrows;
        this.pageDistance = data.pageDistance;
    }

    public toJSON() {
        return {
            map: this.map,
            pageArrows: this.pageArrows,
            pageDistance: this.pageDistance
        };
    }

    get map(): boolean {
        return this._map;
    }

    set map(value: boolean) {
        this.typeChecker.validateAsBooleanOrUndefined("Map", value);
        this._map = value;
    }

    get pageDistance(): boolean {
        return this._pageDistance;
    }

    set pageDistance(value: boolean) {
        this.typeChecker.validateAsBooleanOrUndefined("PageDistance", value);
        this._pageDistance = value;
    }

    get pageArrows(): boolean {
        return this._pageArrows;
    }

    set pageArrows(value: boolean) {
        this.typeChecker.validateAsBooleanOrUndefined("PageArrows", value);
        this._pageArrows = value;
    }
}