import {TypeChecker} from "../../../../src/resources/utilities/TypeChecker";
import {CircleLocation} from "../../../../src/resources/models/locations/CircleLocation";

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

describe("CircleLocation", () => {

    let typeChecker = new TypeChecker;

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it("can be created with no data", () => {
        let comparisonCondition = new CircleLocation(typeChecker);

        expect(comparisonCondition instanceof CircleLocation).toBeTruthy();
    });


    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new CircleLocation(typeChecker);

        expect(() => {
            model.fromObject([] as any)
        }).toThrow();

        expect(() => {
            model.fromObject("a" as any)
        }).toThrow();
    });

    it("can have its type set to circle", () => {
        let comparisonCondition = new CircleLocation(typeChecker);
        comparisonCondition.type = "circle";

        expect(comparisonCondition.type).toEqual("circle");
    });

    it("will throw an error if its type is set to something other than comparison", () => {
        let comparisonCondition = new CircleLocation(typeChecker);
        expect(() => {
            comparisonCondition.type = "somethingRandom"
        }).toThrow();
    });

    it("can have its lat set to a number", () => {
        let comparisonCondition = new CircleLocation(typeChecker);
        comparisonCondition.lat = 123;

        expect(comparisonCondition.lat).toEqual(123);
    });

    it("throw if its lat set to something other than a number", () => {
        let comparisonCondition = new CircleLocation(typeChecker);

        expect(() => {comparisonCondition.lat = "123" as any;}).toThrow();
    });

    it("can have its lon set to a number", () => {
        let comparisonCondition = new CircleLocation(typeChecker);
        comparisonCondition.lon = 123;

        expect(comparisonCondition.lon).toEqual(123);
    });

    it("throw if its lon set to something other than a number", () => {
        let comparisonCondition = new CircleLocation(typeChecker);

        expect(() => {comparisonCondition.lon = "123" as any;}).toThrow();
    });

    it("can have its radius set to a number", () => {
        let comparisonCondition = new CircleLocation(typeChecker);
        comparisonCondition.radius = 123;

        expect(comparisonCondition.radius).toEqual(123);
    });

    it("throw if its radius set to something other than a number", () => {
        let comparisonCondition = new CircleLocation(typeChecker);

        expect(() => {comparisonCondition.radius = "123" as any;}).toThrow();
    });


});