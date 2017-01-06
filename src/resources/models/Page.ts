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
import {BaseCondition} from "./conditions/BaseCondition";
import {VariableCollection} from "../collections/VariableCollection";
import {LocationInformation} from "../gps/LocationInformation";
import {LocationCollection} from "../collections/LocationCollection";
import {ConditionCollection} from "../collections/ConditionCollection";

@inject(TypeChecker)
export class Page extends BaseModel {

    private _name: string;
    private _conditions: Array<BaseCondition>;

    private _isViewable: boolean;
    private _isReadable: boolean;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);
        this.fromObject(data);
    }

    public fromObject(data: any = {id: undefined, name: undefined, conditions: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.name = data.name;
        this.conditions = data.conditions;
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            conditions: this.conditions,
        }
    }

    get conditions(): Array<BaseCondition> {
        return this._conditions;
    }

    set conditions(value: Array<BaseCondition>) {
        this._conditions = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Name", value);
        this._name = value;
    }

    get isReadable(): boolean {
        return this._isReadable;
    }

    set isReadable(value: boolean) {
        this._isReadable = value;
    }

    get isViewable(): boolean {
        return this._isViewable;
    }

    set isViewable(value: boolean) {
        this._isViewable = value;
    }

    // A page is viewable if all conditions for the page are valid, not including any location conditions.
    public updateViewable(variables: VariableCollection, conditions: ConditionCollection) {
        this.isViewable = this.conditions.every((condition) => {
            return condition.execute(variables, conditions)
        })

    }

    // A page is readable if all conditions for the page are valid, including all location conditions.
    public updateReadable(variables: VariableCollection, conditions: ConditionCollection, locations: LocationCollection, userLocation: LocationInformation) {
        this.isReadable = this.conditions.every((condition) => {
            return condition.execute(variables, conditions, locations, userLocation)
        })

    }
}