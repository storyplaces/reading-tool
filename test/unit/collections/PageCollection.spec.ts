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

import {PageCollection} from "../../../src/resources/collections/PageCollection";
import {Page} from "../../../src/resources/models/Page";
import {Container} from 'aurelia-dependency-injection';

describe("PageCollection", () => {
    let container:Container;

    function resolve(object: Function, data? : any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
    });

    afterEach(() => {
        container = null;
    });

    it("can be instantiated with no data", () => {
        let collection = resolve(PageCollection);

        expect(collection.all.length).toEqual(0);
    });

    it("creates a set of Page objects when created with an array of plain objects", () => {
        let collection = resolve(PageCollection, [{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Page objects when created with an array of Page objects", () => {
        let model1 = resolve(Page, {id: "1"});
        let model2 = resolve(Page, {id: "2"});

        let collection = resolve(PageCollection, [model1, model2]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Page).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
    
    
    it("creates a Page object when saving a plain object", () => {
        let collection = resolve(PageCollection);
        collection.save({id:"1"});

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Page object when saving a Page object", () => {
        let model = resolve(Page, {id: "1"});

        let collection = container.invoke(PageCollection);
        collection.save(model);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });

    it("creates a set of Page objects when saving an array of plain objects", () => {
        let collection = resolve(PageCollection);
        collection.saveMany([{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Page objects when saving an array of Page objects", () => {
        let model1 = resolve(Page, {id: "1"});
        let model2 = resolve(Page, {id: "2"});

        let collection = resolve(PageCollection);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Page).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
});
