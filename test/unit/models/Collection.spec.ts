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
import {TypeChecker} from "../../../src/resources/utilities/TypeChecker";
import {Collection} from "../../../src/resources/models/Collection";

describe("Collection model", () => {
    let typeChecker: TypeChecker;

    beforeEach(() => {
        typeChecker = new TypeChecker();
    });

    it("can be instantiated with no data", () => {
        let collection = new Collection(typeChecker);

        expect(collection instanceof Collection).toEqual(true);

        expect(collection.id).toBeUndefined();
        expect(collection.name).toBeUndefined();
        expect(collection.description).toBeUndefined();
        expect(collection.storyIds).toEqual([]);
    });

    it("can be instantiated with data", () => {
        let data = {'id': '123', 'name': 'A collection of stories', 'description': 'A description', 'slug': 'this-is-a-slug', 'storyIds': ['456', '789']};

        let collection = new Collection(typeChecker, data);

        expect(collection.id).toEqual('123');
        expect(collection.name).toEqual('A collection of stories');
        expect(collection.description).toEqual('A description');
        expect(collection.storyIds.length).toEqual(2);
        expect(collection.storyIds).toContain('456');
        expect(collection.storyIds).toContain('789');
        expect(collection.slug).toEqual('this-is-a-slug');
    });

    it("can have data passed into fromObject", () => {
        let data = {'id': '123', 'name': 'A collection of stories', 'description': 'A description', 'slug': 'this-is-a-slug', 'storyIds': ['456', '789']};

        let collection = new Collection(typeChecker);
        collection.fromObject(data);

        expect(collection.id).toEqual('123');
        expect(collection.name).toEqual('A collection of stories');
        expect(collection.description).toEqual('A description');
        expect(collection.storyIds.length).toEqual(2);
        expect(collection.storyIds).toContain('456');
        expect(collection.storyIds).toContain('789');
        expect(collection.slug).toEqual('this-is-a-slug');
    });

    it("will throw an exception if the id is not a string", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.id = 1 as any;
        }).toThrowError(TypeError);
    });

    it("will throw an exception if the name is not a string", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.name = 1234 as any;
        }).toThrowError(TypeError);
    });

    it("will throw an exception if the description is not a string", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.description = 1234 as any;
        }).toThrowError(TypeError);
    });

    it("will throw an exception if storyIds is not an array", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.storyIds = 1234 as any;
        }).toThrowError(TypeError);
    });

    it("will throw an exception if storyIds is an array but has something other than a string as a member", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.storyIds = ['123', 456] as any;
        }).toThrowError(TypeError);
    });

    it("will throw an exception if the slug is not a string", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.slug = 1234 as any;
        }).toThrowError(TypeError);
    });

    it("will throw an exception if the slug is not a properly formatted string", () => {
        let collection = new Collection(typeChecker);
        expect(() => {
            collection.slug = 'ABC123' as any;
        }).toThrowError(TypeError);
    });

    it("will output JSON when passed to JSON.stringify", () => {
        let data = {'id': '123', 'name': 'A collection of stories', 'description': 'A description', 'storyIds': ['456', '789'], 'slug': 'this-is-a-slug'};

        let collection = new Collection(typeChecker, data);

        let result = JSON.stringify(collection);

        //TODO:  Make this a real test as we don't have any sub modules!
        expect(result).toEqual('{"id":"123","name":"A collection of stories","description":"A description","storyIds":["456","789"],"slug":"this-is-a-slug"}');
    });
});