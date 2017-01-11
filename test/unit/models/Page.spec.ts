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
import {Page} from "../../../src/resources/models/Page";
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";
import {VariableCollection} from "../../../src/resources/collections/VariableCollection";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../src/resources/collections/ConditionCollection";
import {LocationCollection} from "../../../src/resources/collections/LocationCollection";
import {LocationInformation} from "../../../src/resources/gps/LocationInformation";
import {TrueCondition} from "../../../src/resources/models/conditions/boolean/TrueCondition";
import {LocationCondition} from "../../../src/resources/models/conditions/LocationCondition";
import {FalseCondition} from "../../../src/resources/models/conditions/boolean/FalseCondition";

describe("Page model", () => {
    let factoryCalledWith;
    let typeChecker: TypeChecker;
    let conditionCollectionFactoryCalledWith;

    // let factory = (data) => {
    //     factoryCalledWith = data;
    //     return data as VariableCollection;
    // };

    let conditionCollectionFactory = (data) => {
        conditionCollectionFactoryCalledWith = data;
        return undefined;
    };

    let container: Container = new Container().makeGlobal();

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        factoryCalledWith = "set to something random";
        typeChecker = new TypeChecker;
    });

    afterEach(() => {
        typeChecker = null;
    });

    it("can be instantiated with no data", () => {
        let model = new Page(typeChecker);

        expect(model.id).toBeUndefined();
        expect(model.name).toBeUndefined();
        expect(model.conditions).toBeUndefined();
    });

    it("can be instantiated with data", () => {
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: ["condition2"]});

        expect(model.id).toEqual("1");
        expect(model.name).toEqual("name");
        expect(model.conditions).toEqual(["condition2"]);
    });

    it("can have an anonymous object passed to it", () => {
        let model = new Page(typeChecker);

        model.fromObject({id: "1", name: "name", conditions: ["condition2"]});

        expect(model.id).toEqual("1");
        expect(model.name).toEqual("name");
        expect(model.conditions).toEqual(["condition2"]);
    });

    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new Page(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    it("will throw an exception when name is set to something other than a string or undefined", () => {
        let model = new Page(typeChecker);

        expect(() => {
            model.name = 1 as any
        }).toThrow()
    });

    it("can be cast to JSON", () => {
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: ["condition1"]});

        let result = JSON.stringify(model);

        expect(result).toEqual('{"id":"1","name":"name","conditions":["condition1"],"hint":{}}');
    });

    it("can have isReadable set and retrieved", () => {
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: ["condition1"]});

        model.isReadable = true;
        expect(model.isReadable).toEqual(true);
    });

    it("can have isViewable set and retrieved", () => {
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: ["condition1"]});

        model.isViewable = true;
        expect(model.isViewable).toEqual(true);
    });

    it("can have isViewable set and retrieved", () => {
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: ["condition1"]});

        model.isViewable = true;
        expect(model.isViewable).toEqual(true);
    });

    it("sets isViewable to true when no conditions", () => {
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: []});

        let variables = resolve(VariableCollection, []);
        let conditions = resolve(ConditionCollection, []);

        model.updateStatus(variables, conditions, {} as LocationCollection, {} as LocationInformation);
        expect(model.isViewable).toEqual(true);
    });

    it("sets isViewable to true when all conditions are met", () => {
        let conditions = new ConditionCollection(conditionCollectionFactory, [
            resolve(TrueCondition, {id: "true1"}),
            resolve(TrueCondition, {id: "true2"}),
            resolve(TrueCondition, {id: "true3"}),
        ]);
        let conditionsForPage = ["true1", "true2", "true3"];
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: conditionsForPage});

        let variables = resolve(VariableCollection, []);

        model.updateStatus(variables, conditions, {} as LocationCollection, {} as LocationInformation);
        expect(model.isViewable).toEqual(true);

    });

    it("sets isReadable to true when no conditions", () => {

        let model = new Page(typeChecker, {id: "1", name: "name", conditions: []});
        let variables = resolve(VariableCollection, []);

        model.updateStatus(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
        expect(model.isReadable).toEqual(true);
    });

    it("sets isReadable to true when all conditions are met", () => {
        let conditions = new ConditionCollection(conditionCollectionFactory, [
            resolve(TrueCondition, {id: "true1"}),
            resolve(TrueCondition, {id: "true2"}),
            resolve(TrueCondition, {id: "true3"}),
        ]);
        let conditionsForPage = ["true1", "true2", "true3"];
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: conditionsForPage});

        let variables = resolve(VariableCollection, []);

        model.updateStatus(variables, conditions, {} as LocationCollection, {} as LocationInformation);
        expect(model.isReadable).toEqual(true);
    });

    it("sets isViewable to true when all conditions except location conditions are met", () => {
        let locationCondition = new LocationCondition(typeChecker, {
            id: "locationCondition",
            type: "location",
            location: "someLocation",
            bool: "false"
        });
        let conditions = new ConditionCollection(conditionCollectionFactory, [
            resolve(TrueCondition, {id: "true1"}),
            resolve(TrueCondition, {id: "true2"}),
            resolve(TrueCondition, {id: "true3"}),
            locationCondition
        ]);
        let locations = container.invoke(LocationCollection, [[{
            id: "someLocation",
            type: "circle",
            lat: 50.9360987,
            lon: -1.3961843,
            radius: 6
        }]]);
        let conditionsForPage = ["true1", "true2", "true3", "locationCondition"];
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: conditionsForPage});

        let variables = resolve(VariableCollection, []);


        model.updateStatus(variables, conditions, locations, {
            latitude: 50.9362792,
            longitude: -1.3962106,
            accuracy: 0,
            heading: 0
        } as LocationInformation);
        expect(model.isViewable).toEqual(true);
    });

    it("sets isReadable to false when all conditions except location conditions are met", () => {
        let locationCondition = new LocationCondition(typeChecker, {
            id: "locationCondition",
            type: "location",
            location: "someLocation",
            bool: "false"
        });
        let locations = container.invoke(LocationCollection, [[{
            id: "someLocation",
            type: "circle",
            lat: 50.9360987,
            lon: -1.3961843,
            radius: 6
        }]]);
        let conditions = new ConditionCollection(conditionCollectionFactory, [
            resolve(TrueCondition, {id: "true1"}),
            resolve(TrueCondition, {id: "true2"}),
            resolve(TrueCondition, {id: "true3"}),
            locationCondition
        ]);
        let conditionsForPage = ["true1", "true2", "true3", "locationCondition"];
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: conditionsForPage});

        let variables = resolve(VariableCollection, []);


        model.updateStatus(variables, conditions, locations, {
            latitude: 50.9362792,
            longitude: -1.3962106,
            accuracy: 0,
            heading: 0
        } as LocationInformation);
        expect(model.isReadable).toEqual(false);
    });

    it("sets isViewable to false when some conditions are unmet", () => {
        let conditions = new ConditionCollection(conditionCollectionFactory, [
            resolve(TrueCondition, {id: "true1"}),
            resolve(TrueCondition, {id: "true2"}),
            resolve(TrueCondition, {id: "true3"}),
            resolve(FalseCondition, {id: "false1"})
        ]);
        let conditionsForPage = ["true1", "true2", "true3", "false1"];
        let model = new Page(typeChecker, {id: "1", name: "name", conditions: conditionsForPage});

        let variables = resolve(VariableCollection, []);

        model.updateStatus(variables, conditions, {} as LocationCollection, {} as LocationInformation);
        expect(model.isViewable).toEqual(false);
    });

    it("sets isReadable to false when some conditions are unmet", () => {
        let conditions = new ConditionCollection(conditionCollectionFactory, [
            resolve(TrueCondition, {id: "true1"}),
            resolve(TrueCondition, {id: "true2"}),
            resolve(TrueCondition, {id: "true3"}),
            resolve(FalseCondition, {id: "false1"})
        ]);
        let conditionsForPage = ["true1", "true2", "true3", "false1"];

        let model = new Page(typeChecker, {id: "1", name: "name", conditions: conditionsForPage});

        let variables = resolve(VariableCollection, []);

        model.updateStatus(variables, conditions, {} as LocationCollection, {} as LocationInformation);
        expect(model.isReadable).toEqual(false);
    });
});