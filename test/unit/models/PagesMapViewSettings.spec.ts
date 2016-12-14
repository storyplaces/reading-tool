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

import {PagesMapViewSettings} from "../../../src/resources/models/PagesMapViewSettings";
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";

describe("PagesMapViewSettings model", () => {

    let typeChecker: TypeChecker;

    beforeEach(() => {
        typeChecker = new TypeChecker();
    });

    afterEach(() => {
        typeChecker = null;
    });

    it("can be instantiated with no data", () => {
        let model = new PagesMapViewSettings(typeChecker);

        expect(model.map).toBeUndefined();
        expect(model.pageArrows).toBeUndefined();
        expect(model.pageDistance).toBeUndefined();
    });

    it("can be instantiated with an object", () => {
        let data = {map: true, pageArrows: true, pageDistance: true};
        let model = new PagesMapViewSettings(typeChecker, data);

        expect(model.map).toEqual(true);
        expect(model.pageArrows).toEqual(true);
        expect(model.pageDistance).toEqual(true);
    });

    it("can have an anonymous object passed to it", () => {
        let data = {map: true, pageArrows: true, pageDistance: true};
        let model = new PagesMapViewSettings(typeChecker);
        model.fromObject(data);

        expect(model.map).toEqual(true);
        expect(model.pageArrows).toEqual(true);
        expect(model.pageDistance).toEqual(true);
    });

    it("will throw an error if something other than an object is passed to fromObject", () => {
        let model = new PagesMapViewSettings(typeChecker);

        expect(() => {model.fromObject([] as any)}).toThrow();
        expect(() => {model.fromObject("a" as any)}).toThrow();
    });

    it("will throw an error when map is set to something other than a boolean or undefined", () => {
        let model = new PagesMapViewSettings(typeChecker);

        expect(() => {model.map = 1 as any}).toThrow();
    });

    it("will throw an error when pageArrows is set to something other than a boolean or undefined", () => {
        let model = new PagesMapViewSettings(typeChecker);

        expect(() => {model.pageArrows = 1 as any}).toThrow();
    });

    it("will throw an error when pageDistance is set to something other than a boolean or undefined", () => {
        let model = new PagesMapViewSettings(typeChecker);

        expect(() => {model.pageDistance = 1 as any}).toThrow();
    });

    it("will convert to JSON", () => {
        let data = {map: true, pageArrows: true, pageDistance: true};
        let model = new PagesMapViewSettings(typeChecker, data);

        let result = JSON.stringify(model);

        expect(result).toEqual('{"map":true,"pageArrows":true,"pageDistance":true}');
    });
});