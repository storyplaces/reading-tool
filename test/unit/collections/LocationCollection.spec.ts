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
 modification, are permitted provided that the following locations are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of locations and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of locations and the following disclaimer in the
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
import {LocationCollection} from "../../../src/resources/collections/LocationCollection";
import {BaseLocation} from "../../../src/resources/models/locations/BaseLocation";
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";
import {Container} from "aurelia-framework";
import {CircleLocation} from "../../../src/resources/models/locations/CircleLocation";

describe("LocationCollection", () => {

    let locationFactoryCalledWith;
    let typeChecker = new TypeChecker();
    let container:Container = new Container().makeGlobal();

    function resolve(object: Function, data? : any) {
        return container.invoke(object, [data]);
    }

    let locationFactory = (data) => {
        locationFactoryCalledWith = data;
        let location = new Location(typeChecker);
        location.id = data.id;
        return location;

    };

    class Location extends BaseLocation {
        get type() {
            return "type"
        };

        set type(value: any) {
        };

        fromObject(any) {
        }

        constructor(typeChecker: TypeChecker) {
            super(typeChecker);
        }

        toJSON() {
        }

        withinBounds():boolean {return null};
    }

    beforeEach(() => {
        locationFactoryCalledWith = "notYetCalled";
    });

    afterEach(() => {
    });

    it("can be instantiated with no data", () => {
        let collection = new LocationCollection(locationFactory as any);
        expect(collection.all.length).toEqual(0);
        expect(locationFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Location objects when created with an array of plain objects", () => {
        let collection = new LocationCollection(locationFactory as any, [{id: "1"}, {id: "2"}]);
        expect(collection.all.length).toEqual(2);
        expect(locationFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Location objects when created with an array of Location objects", () => {
        let model1 = new Location(typeChecker);
        let model2 = new Location(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new LocationCollection(locationFactory as any, [model1, model2]);

        expect(collection.all[0] instanceof Location).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Location).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
        expect(locationFactoryCalledWith).toEqual("notYetCalled");
    });


    it("creates a Location object when saving a plain object", () => {
        let collection = new LocationCollection(locationFactory as any);
        collection.save({id: "1"});

        expect(collection.all[0] instanceof Location).toBeTruthy();
        expect(locationFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains a Location object when saving a Location object", () => {
        let model = new Location(typeChecker);
        model.id = "1";

        let collection = new LocationCollection(locationFactory as any);
        collection.save(model);

        expect(collection.all[0] instanceof Location).toBeTruthy();
        expect(collection.all[0]).toBe(model);
        expect(locationFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Location objects when saving an array of plain objects", () => {
        let collection = new LocationCollection(locationFactory as any);
        collection.saveMany([{id: "1"}, {id: "2"}]);

        expect(collection.all[0] instanceof Location).toBeTruthy();
        expect(collection.all[1] instanceof Location).toBeTruthy();
        expect(locationFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Location objects when saving an array of Location objects", () => {
        let model1 = new Location(typeChecker);
        let model2 = new Location(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new LocationCollection(locationFactory as any);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Location).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Location).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
        expect(locationFactoryCalledWith).toEqual("notYetCalled");
    });

    it("generates the correct Location for the supplied type", () => {
        let collection = resolve(LocationCollection, [{id:"123", type:"circle"}]);

        expect(collection.get("123") instanceof CircleLocation).toBeTruthy();
    });
});
