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
import {LocationInformation} from "../../gps/LocationInformation";
import {LocationCollection} from "../../collections/LocationCollection";

@inject(TypeChecker)
export class ComparisonCondition extends BaseCondition {
    private _a: string;
    private _b: string;
    private _aType: string;
    private _bType: string;
    private _operand: string;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, a: undefined, b: undefined, aType: undefined, bType: undefined, operand: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.aType = data.aType;
        this.bType = data.bType;
        this.a = data.a;
        this.b = data.b;
        this.operand = data.operand;
    }

    toJSON() {
        return {
            id: this.id,
            type: "comparison",
            a: this.a,
            b: this.b,
            aType: this.aType,
            bType: this.bType,
            operand: this.operand
        };
    }

    get aType(): string {
        return this._aType;
    }

    set aType(value: string) {
        this.validateType("aType", value);
        this._aType = value;
    }

    get bType(): string {
        return this._bType;
    }

    set bType(value: string) {
        this.validateType("bType", value);
        this._bType = value;
    }

    get a(): string {
        return this._a;
    }

    set a(value: string) {

        if (value !== undefined && this.aType === undefined) {
            throw TypeError("Type of a must be set before setting value");
        }

        if (this.aType === "Integer") {
            this.validateIsANumber("a", value);
        }

        this.typeChecker.validateAsStringOrUndefined("a", value);
        this._a = value;
    }

    get b(): string {
        return this._b;
    }

    set b(value: string) {
        if (value !== undefined && this.bType === undefined) {
            throw TypeError("Type of b must be set before setting value");
        }

        if (this.bType === "Integer") {
            this.validateIsANumber("b", value);
        }

        this.typeChecker.validateAsStringOrUndefined("b", value);
        this._b = value;
    }

    get operand(): string {
        return this._operand;
    }

    set operand(value: string) {
        this.validateOperand(value);
        this._operand = value;
    }

    private validateIsANumber(name: string, value: any) {
        let reg = new RegExp('^[0-9]+$');
        if (!reg.test(value)) {
            throw TypeError("The contents of " + name + " must only be digits");
        }
    }


    private validateOperand(value: any) {
        this.typeChecker.validateAsStringOrUndefined("Operand", value);

        if (!this.isValidOperand(value)) {
            throw TypeError("Operand is not a valid operand");
        }
    }

    private validateType(typeName: string, type: any) {
        this.typeChecker.validateAsStringOrUndefined(typeName, type);

        if (!this.isValidType(type)) {
            throw TypeError("The type '" + typeName + "' must be a valid type");
        }
    }

    private isValidType(type) {
        return (type === undefined || type == 'Integer' || type == 'String' || type == 'Variable');
    }

    private isValidOperand(operand) {
        return (operand === undefined || operand == '==' || operand == '!=' || operand == '<' || operand == '>' || operand == '<=' || operand == '>=');
    }

    execute(variables: VariableCollection, conditions: ConditionCollection, locations?: LocationCollection, userLocation?: LocationInformation): boolean {
        let a = this.getValue(this.a, this.aType, variables);
        let b = this.getValue(this.b, this.bType, variables);

        switch (this.operand) {
            case "==":
                return a == b;
            case "!=":
                return a != b;
            case "<":
                return a < b;
            case ">":
                return a > b;
            case "<=":
                return a <= b;
            case ">=":
                return a >= b;
        }
        return false;
    }

    private getValue(value: string, type: string, variables: VariableCollection): string | number {
        if (type == "Variable") {
            let variable = variables.get(value);

            if (!variable) {
                return undefined;
            }

            return variable.value;
        }

        if (type == "Integer") {
            return parseInt(value);
        }

        return value;
    }
}