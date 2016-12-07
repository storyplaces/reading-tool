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
import {VariableCollection} from "../collections/VariableCollection";
import {inject, Factory} from "aurelia-framework";
import {BaseModel} from "./BaseModel";
import {TypeChecker} from "../utilities/TypeChecker";

@inject(Factory.of(VariableCollection), TypeChecker)
export class Reading extends BaseModel {

    private _variables: VariableCollection;
    private _userId: string;
    private _readingId: string;

    constructor(private variableCollectionFactory: (any?) => VariableCollection, private typeChecker: TypeChecker, data?: any) {
        super();
        this.fromObject(data);
    }

    fromObject({id = undefined, readingId = undefined, userId = undefined, variables = undefined} = {}) {
        this.id = id;
        this.readingId = readingId;
        this.userId = userId;
        this.variables = this.variableCollectionFactory(variables);
    }

    toJSON() {
        return {
            id: this.id,
            readingId: this.readingId,
            userId: this.userId,
            variables: this.variables,
        }
    }

    get readingId(): string {
        return this._readingId;
    }

    set readingId(value: string) {
        this.typeChecker.validateAsStringOrUndefined('ReadingId', value);
        this._readingId = value;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(userId: string) {
        this.typeChecker.validateAsStringOrUndefined('UserId', userId);
        this._userId = userId;
    }

    get variables(): VariableCollection {
        return this._variables;
    }

    set variables(value: VariableCollection) {
        this.typeChecker.validateAsObjectOrUndefined("Variables", value, "VariableCollection", VariableCollection);
        this._variables = value;
    }
}