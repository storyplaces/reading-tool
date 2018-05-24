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
import {BaseModel} from "./BaseModel";
import {TypeChecker} from "../utilities/TypeChecker";
import {inject} from "aurelia-framework";
import {HTMLSanitiser} from "../utilities/HTMLSanitiser";


@inject(TypeChecker, HTMLSanitiser)
export class Collection extends BaseModel {
    private _name: string;
    private _description: string;
    private _slug: string;
    private _storyIds: Array<string>;

    constructor(typeChecker: TypeChecker, private sanitiser: HTMLSanitiser, data?: any) {
        super(typeChecker);
        this.fromObject(data);
    }

    get storyIds(): Array<string> {
        return this._storyIds;
    }

    set storyIds(value: Array<string>) {
        this.typeChecker.isUndefinedOrArrayOf("Story Ids", value, "string");
        this._storyIds = value;
    }

    get slug(): string {
        return this._slug;
    }

    set slug(value: string) {
        this.typeChecker.isUndefinedOrMatchesRegex("Slug", value, '^[a-z0-9-]+$');
        this._slug = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Description", value);
        this._description = this.sanitiser.sanitiseCollectionDescription(value);
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Name", value);
        this._name = value;
    }

    public fromObject(data: any = {
        id: undefined,
        name: undefined,
        description: undefined,
        storyIds: undefined,
        slug: undefined
    }) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.slug = data.slug;
        this.storyIds = data.storyIds || [];
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            storyIds: this.storyIds,
            slug: this.slug
        }
    }
}