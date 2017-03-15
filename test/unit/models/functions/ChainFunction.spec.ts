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
import {ChainFunction} from "../../../../src/resources/models/functions/ChainFunction";
import {Container} from "aurelia-framework";
import {ConditionCollection} from "../../../../src/resources/collections/ConditionCollection";
import {LocationInformation} from "../../../../src/resources/gps/LocationInformation";
import {LocationCollection} from "../../../../src/resources/collections/LocationCollection";
import {VariableCollection} from "../../../../src/resources/collections/VariableCollection";
import {FalseCondition} from "../../../../src/resources/models/conditions/boolean/FalseCondition";
import {TrueCondition} from "../../../../src/resources/models/conditions/boolean/TrueCondition";
import moment = require('moment');
import {LoggingHelper} from "../../../../src/resources/logging/LoggingHelper";
import {FunctionCollection} from "../../../../src/resources/collections/FunctionCollection";
import {SetFunction} from "../../../../src/resources/models/functions/SetFunction";

describe("ChainFunction", () => {

    let container: Container = new Container().makeGlobal();

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    let typeChecker = new TypeChecker;
    let loggingHelper = resolve(LoggingHelper);

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with data", () => {
        let testFunction = new ChainFunction(typeChecker, loggingHelper, {type:"settimestamp"});

        expect(testFunction instanceof ChainFunction).toBeTruthy();
    });

    it("can be created with no data", () => {
        let testFunction = new ChainFunction(typeChecker, loggingHelper);

        expect(testFunction instanceof ChainFunction).toBeTruthy();
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new ChainFunction(typeChecker, loggingHelper);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    })

    describe("method execute", () => {
        let container: Container = new Container().makeGlobal();

        let variables: VariableCollection;
        let trueCondition : TrueCondition
        let falseCondition :FalseCondition;
        let conditions :ConditionCollection;
        let functions: FunctionCollection;

        let testFunction1: SetFunction;
        let testFunction2: SetFunction;
        let testFunction3: SetFunction;

        beforeEach(() => {
            variables = container.invoke(VariableCollection, [[{id: "existing", value: "1"}]]);
            trueCondition = container.invoke(TrueCondition, [{id: "true"}]);
            falseCondition = container.invoke(FalseCondition, [{id: "false"}]);
            conditions = container.invoke(ConditionCollection, [[trueCondition, falseCondition]]);

            testFunction1 = container.invoke(SetFunction, [{id: "1"}]);
            testFunction2 = container.invoke(SetFunction, [{id: "2"}]);
            testFunction3 = container.invoke(SetFunction, [{id: "3"}]);

            spyOn(testFunction1, 'execute');
            spyOn(testFunction2, 'execute');
            spyOn(testFunction3, 'execute');

            functions = container.invoke(FunctionCollection,[[testFunction1, testFunction2, testFunction3]]);

            spyOn(loggingHelper, "logChangeVariable");
        });

        afterEach(() => {
            variables = undefined;
            trueCondition = undefined;
            falseCondition = undefined;
            conditions = undefined;
        });

        it("calls the correct functions with no conditions set", () => {
            let testFunction = new ChainFunction(typeChecker, loggingHelper, {id: "test", functions: ["1", "2"], conditions: []});
            testFunction.execute("testStory", "testReading", variables, conditions, functions, {} as LocationCollection, {} as LocationInformation);

            expect(testFunction1.execute).toHaveBeenCalledTimes(1);
            expect(testFunction2.execute).toHaveBeenCalledTimes(1);
            expect(testFunction3.execute).not.toHaveBeenCalled();
        });

        it("calls the correct functions with true conditions set", () => {
            let testFunction = new ChainFunction(typeChecker, loggingHelper, {id: "test", functions: ["1", "2"], conditions: ["true"]});
            testFunction.execute("testStory", "testReading", variables, conditions, functions, {} as LocationCollection, {} as LocationInformation);

            expect(testFunction1.execute).toHaveBeenCalledTimes(1);
            expect(testFunction2.execute).toHaveBeenCalledTimes(1);
            expect(testFunction3.execute).not.toHaveBeenCalled();
        });


        it("calls no functions with false conditions set", () => {
            let testFunction = new ChainFunction(typeChecker, loggingHelper, {id: "test", functions: ["1", "2"], conditions: ["false"]});
            testFunction.execute("testStory", "testReading", variables, conditions, functions, {} as LocationCollection, {} as LocationInformation);

            expect(testFunction1.execute).not.toHaveBeenCalled();
            expect(testFunction2.execute).not.toHaveBeenCalled();
            expect(testFunction3.execute).not.toHaveBeenCalled();
        });


        it("calls nothing if no functions passed", () => {
            let testFunction = new ChainFunction(typeChecker, loggingHelper, {id: "test", functions: [], conditions: []});
            testFunction.execute("testStory", "testReading", variables, conditions, functions, {} as LocationCollection, {} as LocationInformation);

            expect(testFunction1.execute).not.toHaveBeenCalled();
            expect(testFunction2.execute).not.toHaveBeenCalled();
            expect(testFunction3.execute).not.toHaveBeenCalled();
        });

        it("calls nothing if functions is undefined", () => {
            let testFunction = new ChainFunction(typeChecker, loggingHelper, {id: "test", conditions: []});
            testFunction.execute("testStory", "testReading", variables, conditions, functions, {} as LocationCollection, {} as LocationInformation);

            expect(testFunction1.execute).not.toHaveBeenCalled();
            expect(testFunction2.execute).not.toHaveBeenCalled();
            expect(testFunction3.execute).not.toHaveBeenCalled();
        });
    });
});