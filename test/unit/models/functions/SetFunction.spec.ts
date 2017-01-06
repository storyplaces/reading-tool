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
import {SetFunction} from "../../../../src/resources/models/functions/SetFunction";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";
import {FalseCondition} from "../../../../src/resources/models/conditions/boolean/FalseCondition";
import {TrueCondition} from "../../../../src/resources/models/conditions/boolean/TrueCondition";

describe("SetFunction", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with data", () => {
        let testFunction = new SetFunction(typeChecker, {type:"set"});

        expect(testFunction instanceof SetFunction).toBeTruthy();
    });

    it("can be created with no data", () => {
        let testFunction = new SetFunction(typeChecker);

        expect(testFunction instanceof SetFunction).toBeTruthy();
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new SetFunction(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    it("can have its type set to set", () => {
        let testFunction = new SetFunction(typeChecker);
        testFunction.type = "set";

        expect(testFunction.type).toEqual("set");
    });

    it("will throw an error if its type is set to something other than comparison", () => {
        let testFunction = new SetFunction(typeChecker);
        expect(() => {
            testFunction.type = "somethingRandom"
        }).toThrow();
    });

    it("can have its value set to a string", () => {
        let testFunction = new SetFunction(typeChecker);
        testFunction.value = "abc";

        expect(testFunction.value).toEqual("abc");
    });

    it("throw if its value set to something other than a string", () => {
        let testFunction = new SetFunction(typeChecker);

        expect(() => {testFunction.value = 123 as any;}).toThrow();
    });

    describe("method execute", () => {
        let container: Container = new Container().makeGlobal();

        let variables: VariableCollection;
        let trueCondition : TrueCondition
        let falseCondition :FalseCondition;
        let conditions :ConditionCollection;

        beforeEach(() => {
            variables = container.invoke(VariableCollection, [[{id: "existing", value: "1"}]]);
            trueCondition = container.invoke(TrueCondition, [{id: "true", type: "true"}]);
            falseCondition = container.invoke(FalseCondition, [{id: "false", type: "false"}]);
            conditions = container.invoke(ConditionCollection, [[trueCondition, falseCondition]]);
        });

        afterEach(() => {
            variables = undefined;
            trueCondition = undefined;
            falseCondition = undefined;
            conditions = undefined;
        });

        it("sets a existing variable to the passed value with no conditions set", () => {
            let testFunction = new SetFunction(typeChecker, {id: "test", type: "set", variable: "existing", value: "fish", conditions: []});

            expect(variables.get("existing").value).toEqual("1");
            testFunction.execute(variables, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(variables.get("existing").value).toEqual("fish");
        });

        it("creates a new variable and sets it to the passed value with no conditions set", () => {
            let testFunction = new SetFunction(typeChecker, {id: "test", type: "set", variable: "doesNotExist", value: "foo", conditions: []});

            expect(variables.get("doesNotExist")).toBeUndefined();
            testFunction.execute(variables, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(variables.get("doesNotExist").value).toEqual("foo");
        });

        it("sets a existing variable to the passed value with true conditions set", () => {
            let testFunction = new SetFunction(typeChecker, {id: "test", type: "set", variable: "existing", value: "bar", conditions: ["true", "true"]});

            expect(variables.get("existing").value).toEqual("1");
            testFunction.execute(variables, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(variables.get("existing").value).toEqual("bar");
        });

        it("creates a new variable and sets it to the passed value with true conditions set", () => {
            let testFunction = new SetFunction(typeChecker, {id: "test", type: "set", variable: "doesNotExist", value: "baz", conditions: ["true", "true"]});

            expect(variables.get("doesNotExist")).toBeUndefined();
            testFunction.execute(variables, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(variables.get("doesNotExist").value).toEqual("baz");
        });

        it("does not set a existing variable to the passed value if conditions fail", () => {
            let testFunction = new SetFunction(typeChecker, {id: "test", type: "set", variable: "existing", value: "doesNothing", conditions: ["false"]});

            expect(variables.get("existing").value).toEqual("1");
            testFunction.execute(variables, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(variables.get("existing").value).toEqual("1");
        });

        it("does not create a new variable if conditions fail", () => {
            let testFunction = new SetFunction(typeChecker, {id: "test", type: "set", variable: "doesNotExist", value: "neverSeen", conditions: ["false"]});

            expect(variables.get("doesNotExist")).toBeUndefined();
            testFunction.execute(variables, conditions, {} as LocationCollection, {} as LocationInformation);
            expect(variables.get("doesNotExist")).toBeUndefined();
        });
    });
});