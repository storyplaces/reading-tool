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
import {TimePassedCondition} from "../../../../src/resources/models/conditions/TimePassedCondition";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";

import moment = require('moment');


describe("TimePassedCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with no data", () => {
        let timePassedCondition = new TimePassedCondition(typeChecker);

        expect(timePassedCondition instanceof TimePassedCondition).toBeTruthy();
    });

    it("can be created with data", () => {
        let timePassedCondition = new TimePassedCondition(typeChecker, {type: "timepassed", minutes: 1, variable: "abc"});

        expect(timePassedCondition instanceof TimePassedCondition).toBeTruthy();

        expect(timePassedCondition.minutes).toEqual(1);
        expect(timePassedCondition.variable).toEqual("abc")
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new TimePassedCondition(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    describe("type", () => {
        it("can be set to comparison", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker);
            timePassedCondition.type = "timepassed";

            expect(timePassedCondition.type).toEqual("timepassed");
        });

        it("will throw an error if set to something other than check", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker);
            expect(() => {
                timePassedCondition.type = "somethingRandom"
            }).toThrow();
        });
    });

    describe("region variable", () => {
        it("can be set as a string", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker);
            timePassedCondition.variable = "value";

            expect(timePassedCondition.variable).toEqual("value");
        });

        it("will throw an error if set to not a string", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker);
            expect(() => {
                timePassedCondition.variable = 1 as any;
            }).toThrow();
        });
    });

    describe("minutes passed variable", () => {
        it("can be set as a number", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker);
            timePassedCondition.minutes = 123;

            expect(timePassedCondition.minutes).toEqual(123);
        });

        it("will throw an error if set to not a number", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker);
            expect(() => {
                timePassedCondition.minutes = "aa" as any;
            }).toThrow();
        });
    });

    describe("method execute", () => {
        let container: Container = new Container().makeGlobal();

        let fiveMinutesAgo = moment().subtract(5, 'm').unix();

        let variables = container.invoke(VariableCollection, [[{id: "timestamp1", value:fiveMinutesAgo.toString()}]]);

        it("returns true if more than the number of minutes have passed since the time in the variable", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker, {id: "test", type: "timepassed", minutes: 4, variable: "timestamp1"});
            let result = timePassedCondition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(true);
        });

        it("returns false if less than the number of minutes have passed since the time in the variable", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker, {id: "test", type: "timepassed", minutes: 6, variable: "timestamp1"});
            let result = timePassedCondition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(false);
        });

        it("throws if the condition doesn't exist", () => {
            let timePassedCondition = new TimePassedCondition(typeChecker, {id: "test", type: "timepassed", minutes: 6, variable: "somethingElse"});
            expect(() => {
                timePassedCondition.execute(variables, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            }).toThrow();
        });
    });
});