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
import {Reading} from "../Reading";
import {inject} from "aurelia-framework";

@inject(TypeChecker)

export class ComparisonCondition extends BaseCondition {
    private _a: string|number|boolean;
    private _b: string|number|boolean;
    private _aType: string;
    private _bType: string;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, type: undefined, a: undefined, b: undefined, aType: undefined, bType: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.type = data.type;
        this.aType = data.aType;
        this.bType = data.bType;
        this.a = data.a;
        this.b = data.b;
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            a: this.a,
            b: this.b,
            aType: this.aType,
            bType: this.bType
        };
    }

    execute(reading: Reading) {

    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Type", value);
        this.typeChecker.validateScalarValue("Type", "comparison", value);
        this._type = value;
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

    get a(): string|number|boolean {
        return this._a;
    }

    set a(value: string|number|boolean) {
        this.validateValue('a', value, this.aType);
        this._a = value;
    }

    get b(): string|number|boolean {
        return this._b;
    }

    set b(value: string|number|boolean) {
        this.validateValue('b', value, this.bType);
        this._b = value;
    }

    private validateType(typeName: string, type: any) {
        this.typeChecker.validateAsStringOrUndefined(typeName, type);

        if (!this.isValidType(type)) {
            throw TypeError("The type '" + typeName + "' must be a valid type");
        }
    }

    private validateValue(valueName: string, value: any, type: string) {
        if (value === undefined) {
            return;
        }

        if (type === undefined) {
            throw TypeError("Type of " + valueName + " must be set before setting value");
        }

        if (!this.isValidType(type)) {
            throw TypeError("The type for variable '" + valueName + "' must be a valid type");
        }

        this.validateValueAgainstType(valueName, value, type);
    }

    private validateValueAgainstType(valueName: string, value: any, type: string) {
        switch (type) {
            case 'Integer' :
                this.typeChecker.validateAsNumberOrUndefined(valueName, value);
                break;
            case 'String':
                this.typeChecker.validateAsStringOrUndefined(valueName, value);
                break;
            case 'Boolean':
                this.typeChecker.validateAsBooleanOrUndefined(valueName, value);
                break;
            case 'Variable' :
                this.typeChecker.validateAsStringOrUndefined(valueName, value);
                break;
        }
    }

    private isValidType(type) {
        return (type == 'Integer' || type == 'String' || type == 'Boolean' || type == 'Variable');
    }
}