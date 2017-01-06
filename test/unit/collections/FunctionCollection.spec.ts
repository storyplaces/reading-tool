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
 modification, are permitted provided that the following MockFunctions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of MockFunctions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of MockFunctions and the following disclaimer in the
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
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";
import {Container} from "aurelia-framework";
import {BaseFunction} from "../../../src/resources/models/functions/BaseFunction";
import {FunctionCollection} from "../../../src/resources/collections/FunctionCollection";
import {SetFunction} from "../../../src/resources/models/functions/SetFunction";
import {SetTimeStampFunction} from "../../../src/resources/models/functions/SetTimeStampFunction";
import {IncrementFunction} from "../../../src/resources/models/functions/IncrementFunction";

describe("FunctionCollection", () => {

    let MockFunctionFactoryCalledWith;
    let typeChecker = new TypeChecker();

    let container: Container = new Container().makeGlobal();

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }


    let MockFunctionFactory = (data) => {
        MockFunctionFactoryCalledWith = data;
        let mockFunction = new MockFunction(typeChecker);
        mockFunction.id = data.id;
        return mockFunction;
    };

    class MockFunction extends BaseFunction {

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

        execute(variables: any, MockFunctions: any, locations?: any, userLocation?: any) {
        }
    }


    beforeEach(() => {
        MockFunctionFactoryCalledWith = "notYetCalled";
    });

    afterEach(() => {
    });

    it("can be instantiated with no data", () => {
        let collection = new FunctionCollection(MockFunctionFactory);
        expect(collection.all.length).toEqual(0);
        expect(MockFunctionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Function objects when created with an array of plain objects", () => {
        let collection = new FunctionCollection(MockFunctionFactory, [{id: "1"}, {id: "2"}]);
        expect(collection.all.length).toEqual(2);
        expect(MockFunctionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Function objects when created with an array of MockFunction objects", () => {
        let model1 = new MockFunction(typeChecker);
        let model2 = new MockFunction(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new FunctionCollection(MockFunctionFactory, [model1, model2]);

        expect(collection.all[0] instanceof MockFunction).toEqual(true);
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof MockFunction).toEqual(true);
        expect(collection.all[1]).toBe(model2);
        expect(MockFunctionFactoryCalledWith).toEqual("notYetCalled");
    });


    it("creates a Function object when saving a plain object", () => {
        let collection = new FunctionCollection(MockFunctionFactory);
        collection.save({id: "1"});

        expect(collection.all[0] instanceof MockFunction).toEqual(true);
        expect(MockFunctionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains a Function object when saving a MockFunction object", () => {
        let model = new MockFunction(typeChecker);
        model.id = "1";

        let collection = new FunctionCollection(MockFunctionFactory);
        collection.save(model);

        expect(collection.all[0] instanceof MockFunction).toEqual(true);
        expect(collection.all[0]).toBe(model);
        expect(MockFunctionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Function objects when saving an array of plain objects", () => {
        let collection = new FunctionCollection(MockFunctionFactory);
        collection.saveMany([{id: "1"}, {id: "2"}]);

        expect(collection.all[0] instanceof MockFunction).toEqual(true);
        expect(collection.all[1] instanceof MockFunction).toEqual(true);
        expect(MockFunctionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Function objects when saving an array of MockFunction objects", () => {
        let model1 = new MockFunction(typeChecker);
        let model2 = new MockFunction(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new FunctionCollection(MockFunctionFactory);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof MockFunction).toEqual(true);
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof MockFunction).toEqual(true);
        expect(collection.all[1]).toBe(model2);
        expect(MockFunctionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("generates the correct Function for the supplied type", () => {
        let collection = resolve(FunctionCollection, [
            {id: "set-function", type: "set", variable: "a", value: "a"},
            {id: "settimestamp-function", type: "settimestamp", variable: "a"},
            {id: "increment-function", type: "increment", variable: "a", value: "a"},
        ]);

        expect(collection.get("set-function") instanceof SetFunction).toEqual(true);
        expect(collection.get("settimestamp-function") instanceof SetTimeStampFunction).toEqual(true);
        expect(collection.get("increment-function") instanceof IncrementFunction).toEqual(true);
    });
});
