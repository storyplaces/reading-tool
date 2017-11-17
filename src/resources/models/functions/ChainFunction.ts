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
import {TypeChecker} from "../../utilities/TypeChecker";
import {inject} from "aurelia-framework";
import {BaseFunction} from "./BaseFunction";
import {VariableCollection} from "../../collections/VariableCollection";
import {ConditionCollection} from "../../collections/ConditionCollection";
import {LocationCollection} from "../../collections/LocationCollection";
import {LocationInformation} from "../../gps/LocationInformation";
import {LoggingHelper} from "../../logging/LoggingHelper";
import {FunctionCollection} from "../../collections/FunctionCollection";

@inject(TypeChecker, LoggingHelper)

export class ChainFunction extends BaseFunction {

    private _functionIds: Array<string>;

    constructor(typeChecker: TypeChecker, private loggingHelper: LoggingHelper, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, functions: undefined, conditions: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.functionIds = data.functions;
        this.conditions = data.conditions;
    }

    toJSON() {
        return {
            id: this.id,
            type: "chain",
            functionIds: this.functionIds,
            conditions: this.conditions
        };
    }

    get functionIds(): Array<string> {
        return this._functionIds;
    }

    set functionIds(value: Array<string>) {
        this.typeChecker.isUndefinedOrArrayOf("Function Ids", value, "string");
        this._functionIds = value;
    }


    execute(storyId: string, readingId: string, variables: VariableCollection, conditions: ConditionCollection, functions: FunctionCollection, locations?: LocationCollection, userLocation?: LocationInformation) {
        if (!this.allConditionsPass(variables, conditions, locations, userLocation)) {
            return;
        }

        if (!this.functionIds) {
            return;
        }

        this.functionIds.forEach((functionId) => {
            this.getFunction(functions, functionId).execute(storyId, readingId, variables, conditions, functions, locations, userLocation);
        });
    }

    private getFunction(functions: FunctionCollection, functionId) {
        let func = functions.get(functionId);

        if (!func) {
            throw Error("Function " + functionId + "was not found");
        }

        return func;
    }
}