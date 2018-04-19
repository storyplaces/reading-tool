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
import moment = require('moment');

@inject(TypeChecker)
export class TimePassedCondition extends BaseCondition {

    private _variable: string;
    private _minutes: number;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    get variable(): string {
        return this._variable;
    }

    set variable(value: string) {
        this.typeChecker.validateAsStringOrUndefined("variable", value);
        this._variable = value;
    }

    get minutes(): number {
        return this._minutes;
    }

    set minutes(value: number) {
        this.typeChecker.validateAsNumberOrUndefined("minutes", value);
        this._minutes = value;
    }

    fromObject(data = {id: undefined, variable: undefined, minutes: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.variable = data.variable;
        this.minutes = data.minutes;
    }

    toJSON() {
        return {
            id: this.id,
            type: "timepassed",
            variable: this.variable,
            minutes: this.minutes
        };
    }

    execute(variables: VariableCollection, conditions: ConditionCollection, locations?: LocationCollection, userLocation?: LocationInformation): boolean {
        let timeStamp = variables.get(this.variable);

        if (!timeStamp) {
            return false;
        }

        let now = moment();
        let timestamp = moment.unix(parseInt(timeStamp.value));
        let earliest = timestamp.add(this.minutes, 'm'); // find at which point in time this would be true

        return earliest.isBefore(now);
    }
}