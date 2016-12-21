import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {BaseFunction} from "../../../../src/resources/models/functions/BaseFunction";

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

describe("BaseFunction", () => {

    let typeChecker = new TypeChecker;
    
    class TestFunction extends BaseFunction {
        get type() { return "type"};
        set type(value: any) {};
        
        toJSON() {
        }

        fromObject(any) {
        }
        
    }

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can have conditions set to an array of strings", () => {
        let testFunction = new TestFunction(typeChecker);
        testFunction.conditions = ["a", "b", "c"];

        expect(testFunction.conditions).toEqual(["a", "b", "c"]);
    });

    it("can have conditions set to undefined", () => {
        let testFunction = new TestFunction(typeChecker);
        testFunction.conditions = undefined;

        expect(testFunction.conditions).toEqual(undefined);
    });

    it("will throw an error if conditions is set to something other than an array of strings", () => {
        let testFunction = new TestFunction(typeChecker);
        expect(() => {testFunction.conditions = ["a", "b", 1] as any}).toThrow();
    });

    it("will throw an error if conditions is set to something other than an array of strings", () => {
        let testFunction = new TestFunction(typeChecker);
        expect(() => {testFunction.conditions = 1 as any}).toThrow();
    });

});