import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {TimePassedCondition} from "../../../../src/resources/models/conditions/TimePassedCondition";
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

describe("TimePassedCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with no data", () => {
        let comparisonCondition = new TimePassedCondition(typeChecker);

        expect(comparisonCondition instanceof TimePassedCondition).toBeTruthy();
    });

    it("can be created with data", () => {
        let comparisonCondition = new TimePassedCondition(typeChecker, {type: "timepassed", minutes: 1, variable: "abc"});

        expect(comparisonCondition instanceof TimePassedCondition).toBeTruthy();

        expect(comparisonCondition.minutes).toEqual(1);
        expect(comparisonCondition.variable).toEqual("abc")
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
            let comparisonCondition = new TimePassedCondition(typeChecker);
            comparisonCondition.type = "timepassed";

            expect(comparisonCondition.type).toEqual("timepassed");
        });

        it("will throw an error if set to something other than check", () => {
            let comparisonCondition = new TimePassedCondition(typeChecker);
            expect(() => {
                comparisonCondition.type = "somethingRandom"
            }).toThrow();
        });
    });

    describe("region variable", () => {
        it("can be set as a string", () => {
            let comparisonCondition = new TimePassedCondition(typeChecker);
            comparisonCondition.variable = "value";

            expect(comparisonCondition.variable).toEqual("value");
        });

        it("will throw an error if set to not a string", () => {
            let comparisonCondition = new TimePassedCondition(typeChecker);
            expect(() => {
                comparisonCondition.variable = 1 as any;
            }).toThrow();
        });
    });

    describe("minutes passed variable", () => {
        it("can be set as a number", () => {
            let comparisonCondition = new TimePassedCondition(typeChecker);
            comparisonCondition.minutes = 123;

            expect(comparisonCondition.minutes).toEqual(123);
        });

        it("will throw an error if set to not a number", () => {
            let comparisonCondition = new TimePassedCondition(typeChecker);
            expect(() => {
                comparisonCondition.minutes = "aa" as any;
            }).toThrow();
        });
    });
});