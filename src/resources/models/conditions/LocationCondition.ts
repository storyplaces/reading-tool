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
export class LocationCondition extends BaseCondition {

    private _location: string;

    constructor(typeChecker: TypeChecker, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, bool: undefined, location: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.location = data.location;
    }

    toJSON() {
        return {
            id: this.id,
            type: "location",
            location: this.location
        };
    }


    get location(): string {
        return this._location;
    }

    set location(value: string) {
        this.typeChecker.validateAsStringOrUndefined("location", value);
        this._location = value;
    }

    execute(variables: VariableCollection, conditions: ConditionCollection, locations?: LocationCollection, userLocation?: LocationInformation): boolean {
        // If the conditions are executed with locations or userLocation as undefined it is assumed the conditions are being run not taking location into account so we just return true.
        if (locations == undefined || userLocation == undefined) {
            return true;
        }

        let location = locations.get(this.location);

        if (!location) {
            throw Error("Location id " + this.location + " not found");
        }

        return location.withinBounds(userLocation);
    }
}