/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) $today.year
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
import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {LocationCondition} from "../../../../src/resources/models/conditions/LocationCondition";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";

describe("LocationCondition", () => {

    let typeChecker = new TypeChecker;

    it("can be created with no data", () => {
        let locationCondition = new LocationCondition(typeChecker);

        expect(locationCondition instanceof LocationCondition).toBeTruthy();
    });

    it("can be created with data", () => {
        let locationCondition = new LocationCondition(typeChecker, {type: "location"});

        expect(locationCondition instanceof LocationCondition).toBeTruthy();
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new LocationCondition(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    describe("parameter location", () => {
        it("can be set as a string", () => {
            let locationCondition = new LocationCondition(typeChecker);
            locationCondition.location = "value";

            expect(locationCondition.location).toEqual("value");
        });

        it("will throw an error if set to something other than a string", () => {
            let locationCondition = new LocationCondition(typeChecker);
            expect(() => {
                locationCondition.location = 1 as any;
            }).toThrow();
        });
    });

    describe("method execute", () => {
        let container: Container = new Container().makeGlobal();
        let locations = container.invoke(LocationCollection, [[{id: "someLocation", type: "circle", lat: 50.9360987, lon: -1.3961843, radius: 6}]]);

        it("returns true if the user's location is within the bounds of the location and bool is true", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool:"true"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, locations, {
                latitude: 50.9361435,
                longitude: -1.3961910,
                accuracy: 0,
                heading: 0
            } as LocationInformation);
            expect(result).toEqual(true);
        });

        it("returns false if the user's location is not within the bounds of the location and bool is true", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool: "true"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, locations, {
                latitude: 50.9362792,
                longitude: -1.3962106,
                accuracy: 0,
                heading: 0
            } as LocationInformation);
            expect(result).toEqual(false);
        });


        it("returns false if the user's location is within the bounds of the location and bool is false", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool:"false"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, locations, {
                latitude: 50.9361435,
                longitude: -1.3961910,
                accuracy: 0,
                heading: 0
            } as LocationInformation);
            expect(result).toEqual(false);
        });

        it("returns false if the user's location is not within the bounds of the location and bool is false", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool: "false"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, locations, {
                latitude: 50.9362792,
                longitude: -1.3962106,
                accuracy: 0,
                heading: 0
            } as LocationInformation);
            expect(result).toEqual(false);
        });

        it("returns true if the user's location is within the bounds of the location and bool is true", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool:"true"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, locations, {
                latitude: 50.9361435,
                longitude: -1.3961910,
                accuracy: 0,
                heading: 0
            } as LocationInformation);
            expect(result).toEqual(true);
        });

        it("returns true locations are passed as undefined bool is true", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool:"true"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, undefined, undefined);
            expect(result).toEqual(true);
        });

        it("returns true locations are passed as undefined bool is false", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "someLocation", bool:"false"});
            let result = locationCondition.execute({} as VariableCollection, {} as ConditionCollection, undefined, undefined);
            expect(result).toEqual(true);
        });

        it("throws if the location doesn't exist", () => {
            let locationCondition = new LocationCondition(typeChecker, {id: "test", location: "somethingother"});
            expect(() => {
                locationCondition.execute({} as VariableCollection, {} as ConditionCollection, locations, {
                    latitude: 50.9362792,
                    longitude: -1.3962106,
                    accuracy: 0,
                    heading: 0
                } as LocationInformation);
            }).toThrow();

        });
    });
});