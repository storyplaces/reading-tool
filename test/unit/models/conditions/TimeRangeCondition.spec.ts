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
import {TimeRangeCondition} from "../../../../src/resources/models/conditions/TimeRangeCondition";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";

import moment = require('moment');

describe("TimeRangeCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with no data", () => {
        let timeRangeCondition = new TimeRangeCondition(typeChecker);

        expect(timeRangeCondition instanceof TimeRangeCondition).toBeTruthy();
    });

    it("can be created with data", () => {
        let timeRangeCondition = new TimeRangeCondition(typeChecker, { variable:"abc", start: "12:23", end: "13:45"});

        expect(timeRangeCondition instanceof TimeRangeCondition).toBeTruthy();

        expect(timeRangeCondition.variable).toEqual("abc");
        expect(timeRangeCondition.start).toEqual("12:23");
        expect(timeRangeCondition.end).toEqual("13:45");
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new TimeRangeCondition(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    describe("region variable", () => {
        it("can be set as a string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            timeRangeCondition.variable = "value";

            expect(timeRangeCondition.variable).toEqual("value");
        });

        it("will throw an error if set to not a string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            expect(() => {
                timeRangeCondition.variable = 1 as any;
            }).toThrow();
        });
    });

    describe("start variable", () => {
        it("can be set as a time string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            timeRangeCondition.start = "12:12";

            expect(timeRangeCondition.start).toEqual("12:12");
        });

        it("will throw an error if set to not a time string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            expect(() => {
                timeRangeCondition.start = "abc" as any;
            }).toThrow();
        });

        it("will throw an error if set to not a string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            expect(() => {
                timeRangeCondition.start = 123 as any;
            }).toThrow();
        });
    });
    
    describe("end variable", () => {
        it("can be set as a time string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            timeRangeCondition.end = "12:12";

            expect(timeRangeCondition.end).toEqual("12:12");
        });

        it("will throw an error if set to not a time string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            expect(() => {
                timeRangeCondition.end = "abc" as any;
            }).toThrow();
        });

        it("will throw an error if set to not a string", () => {
            let timeRangeCondition = new TimeRangeCondition(typeChecker);
            expect(() => {
                timeRangeCondition.end = 123 as any;
            }).toThrow();
        });
    });

    /**
     * Note these tests will not work if you are within 5 minutes of midnight!!
     */

    //TODO: Fix this!

    describe("method execute", () => {
        it("returns true if  the current time is between the two values", () => {
            let start = moment().subtract(2, 'm').format("HH:mm");
            let end = moment().add(2, 'm').format("HH:mm");

            let timeRangeCondition = new TimeRangeCondition(typeChecker, {id: "test",  start:start, end:end});
            let result = timeRangeCondition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(true);
        });

        it("returns true if the current time is between the two values, assuming they are on differing days", () => {
            let start = moment().subtract(2, 'm').format("HH:mm");
            let end = moment().subtract(4, 'm').format("HH:mm");

            let timeRangeCondition = new TimeRangeCondition(typeChecker, {id: "test",  start:start, end:end});
            let result = timeRangeCondition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(true);
        });

        it("returns false if the current time is not between the two values", () => {
            let start = moment().add(2, 'm').format("HH:mm");
            let end = moment().add(3, 'm').format("HH:mm");

            let timeRangeCondition = new TimeRangeCondition(typeChecker, {id: "test",  start:start, end:end});
            let result = timeRangeCondition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(false);
        });

        it("returns false if the current time is not between the two values, assuming they are on differing days", () => {
            let start = moment().add(2, 'm').format("HH:mm");
            let end = moment().subtract(2, 'm').format("HH:mm");

            let timeRangeCondition = new TimeRangeCondition(typeChecker, {id: "test",  start:start, end:end});
            let result = timeRangeCondition.execute({} as VariableCollection, {} as ConditionCollection, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(false);
        });
    });
});