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
import {ConditionCollection} from "../../../src/resources/collections/ConditionCollection";
import {BaseCondition} from "../../../src/resources/models/conditions/BaseCondition";
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";
import {Container} from "aurelia-framework";
import {ComparisonCondition} from "../../../src/resources/models/conditions/ComparisonCondition";
import {CheckCondition} from "../../../src/resources/models/conditions/CheckCondition";
import {LocationCondition} from "../../../src/resources/models/conditions/LocationCondition";
import {LogicalCondition} from "../../../src/resources/models/conditions/LogicalCondition";
import {TimePassedCondition} from "../../../src/resources/models/conditions/TimePassedCondition";
import {TimeRangeCondition} from "../../../src/resources/models/conditions/TimeRangeCondition";

describe("ConditionCollection", () => {

    let conditionFactoryCalledWith;
    let typeChecker = new TypeChecker();

    let container: Container = new Container().makeGlobal();

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }


    let conditionFactory = (data) => {
        conditionFactoryCalledWith = data;
        let condition = new MockCondition(typeChecker);
        condition.id = data.id;
        return condition;

    };

    class MockCondition extends BaseCondition {
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

        execute(variables: any, conditions: any, locations?: any, userLocation?: any): boolean {
            return undefined;
        }
    }


    beforeEach(() => {
        conditionFactoryCalledWith = "notYetCalled";
    });

    afterEach(() => {
    });

    it("can be instantiated with no data", () => {
        let collection = new ConditionCollection(conditionFactory);
        expect(collection.all.length).toEqual(0);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Condition objects when created with an array of plain objects", () => {
        let collection = new ConditionCollection(conditionFactory, [{id: "1"}, {id: "2"}]);
        expect(collection.all.length).toEqual(2);
        expect(conditionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Condition objects when created with an array of Condition objects", () => {
        let model1 = new MockCondition(typeChecker);
        let model2 = new MockCondition(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new ConditionCollection(conditionFactory, [model1, model2]);

        expect(collection.all[0] instanceof MockCondition).toEqual(true);
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof MockCondition).toEqual(true);
        expect(collection.all[1]).toBe(model2);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });


    it("creates a Condition object when saving a plain object", () => {
        let collection = new ConditionCollection(conditionFactory);
        collection.save({id: "1"});

        expect(collection.all[0] instanceof MockCondition).toEqual(true);
        expect(conditionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains a Condition object when saving a Condition object", () => {
        let model = new MockCondition(typeChecker);
        model.id = "1";

        let collection = new ConditionCollection(conditionFactory);
        collection.save(model);

        expect(collection.all[0] instanceof MockCondition).toEqual(true);
        expect(collection.all[0]).toBe(model);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Condition objects when saving an array of plain objects", () => {
        let collection = new ConditionCollection(conditionFactory);
        collection.saveMany([{id: "1"}, {id: "2"}]);

        expect(collection.all[0] instanceof MockCondition).toEqual(true);
        expect(collection.all[1] instanceof MockCondition).toEqual(true);
        expect(conditionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Condition objects when saving an array of Condition objects", () => {
        let model1 = new MockCondition(typeChecker);
        let model2 = new MockCondition(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new ConditionCollection(conditionFactory);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof MockCondition).toEqual(true);
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof MockCondition).toEqual(true);
        expect(collection.all[1]).toBe(model2);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("generates the correct Condition for the supplied type", () => {
        let collection = resolve(ConditionCollection, [
            {id: "check-condition", type: "check", variable:"a"},
            {id: "comparison-condition", type: "comparison", aType: "String", a: "a", bType: "String", b: "b"},
            {id: "location-condition", type: "location", bool:"true", location:"a"},
            {id: "logical-condition", type: "logical", operand:"AND", conditions:[]},
            {id: "timepassed-condition", type: "timepassed", variable:"a", minutes:1},
            {id: "timerange-condition", type: "timerange", start:"11:11", end: "22:22"}
        ]);

        expect(collection.get("check-condition") instanceof CheckCondition).toEqual(true);
        expect(collection.get("comparison-condition") instanceof ComparisonCondition).toEqual(true);
        expect(collection.get("location-condition") instanceof LocationCondition).toEqual(true);
        expect(collection.get("logical-condition") instanceof LogicalCondition).toEqual(true);
        expect(collection.get("timepassed-condition") instanceof TimePassedCondition).toEqual(true);
        expect(collection.get("timerange-condition") instanceof TimeRangeCondition).toEqual(true);
    });
});
