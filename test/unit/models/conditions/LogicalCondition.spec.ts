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
import {LogicalCondition} from "../../../../src/resources/models/conditions/LogicalCondition";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";
import {TrueCondition} from "../../../../src/resources/models/conditions/boolean/TrueCondition";
import {FalseCondition} from "../../../../src/resources/models/conditions/boolean/FalseCondition";

describe("LogicalCondition", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with no data", () => {
        let logicalCondition = new LogicalCondition(typeChecker);

        expect(logicalCondition instanceof LogicalCondition).toBeTruthy();
    });

    it("can be created with data", () => {
        let logicalCondition = new LogicalCondition(typeChecker, { operand: "AND", conditions: ["abc", "def"]});

        expect(logicalCondition instanceof LogicalCondition).toBeTruthy();

        expect(logicalCondition.operand).toEqual("AND");
        expect(logicalCondition.conditions).toEqual(["abc", "def"])
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

    describe("operand variable", () => {
        it("can be set as AND", () => {
            let logicalCondition = new LogicalCondition(typeChecker);
            logicalCondition.operand = "AND";

            expect(logicalCondition.operand).toEqual("AND");
        });

        it("can be set as OR", () => {
            let logicalCondition = new LogicalCondition(typeChecker);
            logicalCondition.operand = "OR";

            expect(logicalCondition.operand).toEqual("OR");
        });

        it("will throw an error if set to not AND or OR", () => {
            let logicalCondition = new LogicalCondition(typeChecker);
            expect(() => {
                logicalCondition.operand = "Maybe" as any;
            }).toThrow();
        });

        it("will throw an error if set to not a string", () => {
            let logicalCondition = new LogicalCondition(typeChecker);
            expect(() => {
                logicalCondition.operand = 1 as any;
            }).toThrow();
        });
    });

    describe("conditions variable", () => {
        it("can be set as an array of strings", () => {
            let logicalCondition = new LogicalCondition(typeChecker);
            logicalCondition.conditions = ["123", "456"];

            expect(logicalCondition.conditions).toEqual(["123", "456"]);
        });

        it("will throw an error if set to not an array of string", () => {
            let logicalCondition = new LogicalCondition(typeChecker);
            expect(() => {
                logicalCondition.conditions = [1, 2] as any;
            }).toThrow();

            expect(() => {
                logicalCondition.conditions = 1 as any;
            }).toThrow();
        });
    });

    describe("method execute", () => {
        let container: Container = new Container().makeGlobal();

        let true1 = new TrueCondition(typeChecker, {id: "true1", type: "true"});
        let true2 = new TrueCondition(typeChecker, {id: "true2", type: "true"});
        let true3 = new TrueCondition(typeChecker, {id: "true3", type: "true"});
        let false1 = new FalseCondition(typeChecker, {id: "false1", type: "false"});
        let false2 = new FalseCondition(typeChecker, {id: "false2", type: "false"});
        let false3 = new FalseCondition(typeChecker, {id: "false3", type: "false"});

        let conditions = container.invoke(ConditionCollection, [[true1, true2, true3, false1, false2, false3]]);
        
        it("returns true if in AND mode and all conditions are true", () => {
            let logicalCondition = new LogicalCondition(typeChecker, {id: "test",  operand: "AND", conditions: ["true1", "true2", "true3"]});
            let result = logicalCondition.execute({} as VariableCollection, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(true);
        });

        it("returns false if in AND mode and one conditions is false", () => {
            let logicalCondition = new LogicalCondition(typeChecker, {id: "test",  operand: "AND", conditions: ["true1", "false1", "true3"]});
            let result = logicalCondition.execute({} as VariableCollection, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(result).toEqual(false);
        });
        
        it("throws if the condition doesn't exist", () => {
            let logicalCondition = new LogicalCondition(typeChecker, {id: "test",  conditions: ["somethingOther"]});
            expect(() => {
                logicalCondition.execute({} as VariableCollection, conditions, {} as LocationCollection, {} as LocationInformation);
            }).toThrow();

        });
    });
});