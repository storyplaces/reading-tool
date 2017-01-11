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
import {FunctionCollection} from "../collections/FunctionCollection";

@inject(TypeChecker)
export class Page extends BaseModel {
    private _name: string;
    private _conditions: Array<string>;
    private _content: string;
    private _pageTransition: string;
    private _hintDescription: string;
    private _hintLocations: Array<string>;
    private _functions: Array<string>

    private _isViewable: boolean;
    private _isReadable: boolean;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);
        this.fromObject(data);
    }

    public fromObject(data: any = {id: undefined, name: undefined, conditions: undefined, content: undefined, pageTransition: undefined, hint: {locations:undefined, description:undefined}, functions: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.name = data.name;
        this.conditions = data.conditions;
        this.content = data.content;
        this.pageTransition = data.pageTransition;
        if (data.hint) {
            this.hintLocations = data.hint.locations;
            this.hintDescription = data.hint.description;
        }
        this.functions = data.functions;
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            conditions: this.conditions,
            content: this.content,
            functions: this.functions,
            pageTransition: this.pageTransition,
            hint: {
                description: this.hintDescription,
                locations: this.hintLocations
            }
        }
    }

    get conditions(): Array<string> {
        return this._conditions;
    }

    set conditions(value: Array<string>) {
        this.typeChecker.isUndefinedOrArrayOf("Conditions", value, "string");
        this._conditions = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Name", value);
        this._name = value;
    }

    get functions(): Array<string> {
        return this._functions;
    }

    set functions(value: Array<string>) {
        this.typeChecker.isUndefinedOrArrayOf("Functions", value, "string");
        this._functions = value;
    }

    get hintLocations(): Array<string> {
        return this._hintLocations;
    }

    set hintLocations(value: Array<string>) {
        this.typeChecker.isUndefinedOrArrayOf("Hint Locations", value, "string");
        this._hintLocations = value;
    }

    get hintDescription(): string {
        return this._hintDescription;
    }

    set hintDescription(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Hint Text", value);
        this._hintDescription = value;
    }

    get pageTransition(): string {
        return this._pageTransition;
    }

    set pageTransition(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Page Transition", value);

        if (value != "next" && value != "end" && value != undefined) {
            throw TypeError("Page transition must only be next or end");
        }

        this._pageTransition = value;
    }


    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Content", value);
        this._content = value;
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
        this.isViewable = this.conditions.every((conditionId) => {
            return this.getCondition(conditions, conditionId).execute(variables, conditions);
        });
    }

    // A page is readable if all conditions for the page are valid, including all location conditions.
    public updateReadable(variables: VariableCollection, conditions: ConditionCollection, locations: LocationCollection, userLocation: LocationInformation) {
        this.isReadable = this.conditions.every((conditionId) => {
            return this.getCondition(conditions, conditionId).execute(variables, conditions, locations, userLocation);
        });
    }

    public executeFunctions(variables: VariableCollection, conditions: ConditionCollection, locations: LocationCollection, userLocation: LocationInformation, functions: FunctionCollection) {
        this.functions.forEach((functionId) => {
            this.getFunction(functions, functionId).execute(variables, conditions, locations, userLocation);
        });
    }

    private getCondition(conditions: ConditionCollection, conditionId) {
        let condition = conditions.get(conditionId);

        if (!condition) {
            throw Error("Condition " + conditionId + "was not found");
        }

        return condition;
    }

    private getFunction(functions: FunctionCollection, functionId) {
        let func = functions.get(functionId);

        if (!func) {
            throw Error("Function " + functionId + "was not found");
        }

        return func;
    }
}