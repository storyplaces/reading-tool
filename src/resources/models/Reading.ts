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
    private _storyId: string;
    private _name: string;

    constructor(private variableCollectionFactory: (any?) => VariableCollection, typeChecker: TypeChecker, data?: any) {
        super(typeChecker);
        this.fromObject(data);
    }


    fromObject(data: any = {id:undefined, storyId:undefined, userId:undefined, variables:undefined, name:undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.storyId = data.storyId;
        this.userId = data.userId;
        this.name = name;
        this.variables = this.variableCollectionFactory(data.variables);
    }

    toJSON() {
        return {
            id: this.id,
            storyId: this.storyId,
            userId: this.userId,
            variables: this.variables,
        }
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this.typeChecker.validateAsStringOrUndefined('StoryId', value);
        this._name = value;
    }

    get storyId(): string {
        return this._storyId;
    }

    set storyId(value: string) {
        this.typeChecker.validateAsStringOrUndefined('StoryId', value);
        this._storyId = value;
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