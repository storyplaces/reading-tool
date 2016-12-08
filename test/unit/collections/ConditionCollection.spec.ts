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
import {Reading} from "../../../src/resources/models/Reading";
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";

describe("ConditionCollection", () => {

    let conditionFactoryCalledWith;
    let typeChecker = new TypeChecker();

    let conditionFactory = (data) => {
        conditionFactoryCalledWith = data;
        let condition = new Condition(typeChecker);
        condition.id = data.id;
        return condition;

    };
    
    class Condition extends BaseCondition{
        constructor(typeChecker: TypeChecker) {
            super(typeChecker);
        }

        toJSON() {
        }

        execute(reading: Reading) {
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
        let collection = new ConditionCollection(conditionFactory, [{id: "1"}, {id:"2"}]);
        expect(collection.all.length).toEqual(2);
        expect(conditionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Condition objects when created with an array of Condition objects", () => {
        let model1 = new Condition(typeChecker);
        let model2 = new Condition(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new ConditionCollection(conditionFactory, [model1, model2]);

        expect(collection.all[0] instanceof Condition).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Condition).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });
    
    
    it("creates a Condition object when saving a plain object", () => {
        let collection = new ConditionCollection(conditionFactory);
        collection.save({id:"1"});

        expect(collection.all[0] instanceof Condition).toBeTruthy();
        expect(conditionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains a Condition object when saving a Condition object", () => {
        let model = new Condition(typeChecker);
        model.id = "1";

        let collection = new ConditionCollection(conditionFactory);
        collection.save(model);

        expect(collection.all[0] instanceof Condition).toBeTruthy();
        expect(collection.all[0]).toBe(model);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });

    it("creates a set of Condition objects when saving an array of plain objects", () => {
        let collection = new ConditionCollection(conditionFactory);
        collection.saveMany([{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Condition).toBeTruthy();
        expect(collection.all[1] instanceof Condition).toBeTruthy();
        expect(conditionFactoryCalledWith).not.toEqual("notYetCalled");
    });

    it("maintains an array of Condition objects when saving an array of Condition objects", () => {
        let model1 = new Condition(typeChecker);
        let model2 = new Condition(typeChecker);
        model1.id = "1";
        model2.id = "2";

        let collection = new ConditionCollection(conditionFactory);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Condition).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Condition).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
        expect(conditionFactoryCalledWith).toEqual("notYetCalled");
    });
});
