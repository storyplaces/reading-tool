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

import {Container} from 'aurelia-dependency-injection';
import {CollectionCollection} from "../../../src/resources/collections/CollectionCollection";
import {Collection} from "../../../src/resources/models/Collection";

describe("CollectionCollection", () => {
    let container: Container;

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
    });

    afterEach(() => {
        container = null;
    });

    it("can be instantiated with no data", () => {
        let collection = resolve(CollectionCollection);

        expect(collection.all.length).toEqual(0);
    });

    it("creates a set of Collection objects when created with an array of plain objects", () => {
        let collection = resolve(CollectionCollection, [{id: "1"}, {id: "2"}]);

        expect(collection.all[0] instanceof Collection).toEqual(true);
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Collection objects when created with an array of Variable objects", () => {
        let model1 = resolve(Collection, {id: "1"});
        let model2 = resolve(Collection, {id: "2"});

        let collection = resolve(CollectionCollection, [model1, model2]);

        expect(collection.all[0] instanceof Collection).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Collection).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });


    it("creates a Collection object when saving a plain object", () => {
        let collection = resolve(CollectionCollection);
        collection.save({id: "1"});

        expect(collection.all[0] instanceof Collection).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Collection object when saving a Variable object", () => {
        let model = resolve(Collection, {id: "1"});

        let collection = container.invoke(CollectionCollection);
        collection.save(model);

        expect(collection.all[0] instanceof Collection).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });

    it("creates a set of Collection objects when saving an array of plain objects", () => {
        let collection = resolve(CollectionCollection);
        collection.saveMany([{id: "1"}, {id: "2"}]);

        expect(collection.all[0] instanceof Collection).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Collection objects when saving an array of Collection objects", () => {
        let model1 = resolve(Collection, {id: "1"});
        let model2 = resolve(Collection, {id: "2"});

        let collection = resolve(CollectionCollection);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Collection).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Collection).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
});
