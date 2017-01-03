import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {LogicalCondition} from "../../../../src/resources/models/conditions/LogicalCondition";
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

describe("LogicalCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with no data", () => {
        let comparisonCondition = new LogicalCondition(typeChecker);

        expect(comparisonCondition instanceof LogicalCondition).toBeTruthy();
    });

    it("can be created with data", () => {
        let comparisonCondition = new LogicalCondition(typeChecker, {type: "logical", operand: "AND", conditions: ["abc", "def"]});

        expect(comparisonCondition instanceof LogicalCondition).toBeTruthy();

        expect(comparisonCondition.operand).toEqual("AND");
        expect(comparisonCondition.conditions).toEqual(["abc", "def"])
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new LogicalCondition(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    describe("type", () => {
        it("can be set to logical", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            comparisonCondition.type = "logical";

            expect(comparisonCondition.type).toEqual("logical");
        });

        it("will throw an error if set to something other than check", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            expect(() => {
                comparisonCondition.type = "somethingRandom"
            }).toThrow();
        });
    });

    describe("operand variable", () => {
        it("can be set as AND", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            comparisonCondition.operand = "AND";

            expect(comparisonCondition.operand).toEqual("AND");
        });

        it("can be set as OR", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            comparisonCondition.operand = "OR";

            expect(comparisonCondition.operand).toEqual("OR");
        });

        it("will throw an error if set to not AND or OR", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            expect(() => {
                comparisonCondition.operand = "Maybe" as any;
            }).toThrow();
        });

        it("will throw an error if set to not a string", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            expect(() => {
                comparisonCondition.operand = 1 as any;
            }).toThrow();
        });
    });

    describe("conditions variable", () => {
        it("can be set as an array of strings", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            comparisonCondition.conditions = ["123", "456"];

            expect(comparisonCondition.conditions).toEqual(["123", "456"]);
        });

        it("will throw an error if set to not an array of string", () => {
            let comparisonCondition = new LogicalCondition(typeChecker);
            expect(() => {
                comparisonCondition.conditions = [1, 2] as any;
            }).toThrow();

            expect(() => {
                comparisonCondition.conditions = 1 as any;
            }).toThrow();
        });
    });
});