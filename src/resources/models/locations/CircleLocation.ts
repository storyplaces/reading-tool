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
import {BaseLocation} from "./BaseLocation";
import {LocationHelper} from "../../gps/LocationHelper";
import {LocationInformation} from "../../gps/LocationInformation";

@inject(TypeChecker, LocationHelper)
export class CircleLocation extends BaseLocation{

    private _lat: number;
    private _lon: number;
    private _radius: number;

    constructor(typeChecker: TypeChecker, private locationHelper: LocationHelper, data?: any) {
        super(typeChecker);

        if (data) {
            this.fromObject(data);
        }
    }

    fromObject(data = {id: undefined, type: undefined, lon: undefined, lat: undefined, radius: undefined}) {
        this.typeChecker.validateAsObjectAndNotArray("Data", data);
        this.id = data.id;
        this.type = data.type;
        this.lon = data.lon;
        this.lat = data.lat;
        this.radius = data.radius
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            lat: this.lat,
            lon: this.lon,
            radius: this.radius
        };
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this.typeChecker.validateAsStringOrUndefined("Type", value);
        this.typeChecker.validateScalarValue("Type", "circle", value);
        this._type = value;
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this.typeChecker.validateAsNumberOrUndefined("Radius", value);
        this._radius = value;
    }

    get lon(): number {
        return this._lon;
    }

    set lon(value: number) {
        this.typeChecker.validateAsNumberOrUndefined("Lon", value);
        this._lon = value;
    }

    get lat(): number {
        return this._lat;
    }

    set lat(value: number) {
        this.typeChecker.validateAsNumberOrUndefined("Lat", value);
        this._lat = value;
    }

    withinBounds(location: LocationInformation): boolean {
        return this.locationHelper.pointIsInLocationRadius(location.latitude, location.longitude, this.lat, this.lon, this.radius);
    }
}