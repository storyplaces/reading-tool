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
import {BaseCondition} from "./BaseCondition";
import {TypeChecker} from "../../utilities/TypeChecker";
import {inject} from "aurelia-framework";
import {VariableCollection} from "../../collections/VariableCollection";
import {ConditionCollection} from "../../collections/ConditionCollection";
import {LocationCollection} from "../../collections/LocationCollection";
import {LocationInformation} from "../../gps/LocationInformation";

@inject(TypeChecker)

export class LogicalCondition extends BaseCondition {

    private _operand: string;
    private _conditions: Array<string>;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, type: undefined, operand: undefined, conditions: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.type = data.type;
        this.operand = data.operand;
        this.conditions = data.conditions;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            operand: this.operand,
            conditions: this.conditions
        };
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Type", value);
        this.typeChecker.validateScalarValue("Type", "logical", value);
        this._type = value;
    }

    get operand(): string {
        return this._operand;
    }

    set operand(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Operand", value);
        if (value !== "AND" && value !== "OR" && value !== undefined) {
            throw TypeError("Operand can only be AND or OR");
        }
        this._operand = value;
    }

    get conditions(): Array<string> {
        return this._conditions;
    }

    set conditions(value: Array<string>) {
        this.typeChecker.isArrayOf("Conditions", value, 'string');
        this._conditions = value;
    }

    execute(variables: VariableCollection, conditions: ConditionCollection, locations?: LocationCollection, userLocation?: LocationInformation): boolean {
        if (this.operand == "AND") {
            return this.conditions.every(conditionIdToExecute => this.lookupAndTestCondition(conditionIdToExecute, variables, conditions, locations, userLocation));
        }

        return this.conditions.some(conditionIdToExecute => this.lookupAndTestCondition(conditionIdToExecute, variables, conditions, locations, userLocation));
    }

    private lookupAndTestCondition(conditionIdToExecute, variables: VariableCollection, conditions: ConditionCollection, locations: LocationCollection, userLocation: LocationInformation){
        let conditionToExecute = conditions.get(conditionIdToExecute);

        if (!conditionToExecute) {
            throw Error("Condition id " + conditionIdToExecute + " was not found");
        }

        return conditionToExecute.execute(variables, conditions, locations, userLocation)
    }
}