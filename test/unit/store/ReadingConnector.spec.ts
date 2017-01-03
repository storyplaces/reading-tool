/**
 * Created by andy on 07/12/16.
 */

import {ReadingConnector} from '../../../src/resources/store/ReadingConnector'
import {Container} from 'aurelia-dependency-injection';
import {ReadingCollection} from "../../../src/resources/collections/ReadingCollection";
import {StoryPlacesAPI} from "../../../src/resources/store/StoryplacesAPI";
import {Reading} from "../../../src/resources/models/Reading";

describe("ReadingConnector", () => {

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

    it("can be instantiated with a ReadingCollection and a storyplacesAPI", () => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);

        new ReadingConnector(readingCollection, storyPlacesAPI);
    });

    it("sets the storyPlacesAPI path to /reading/", () => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);

        new ReadingConnector(readingCollection, storyPlacesAPI);
        expect(storyPlacesAPI.path).toEqual("/reading/");

    });

    it("returns readingCollection.all() when all is called", () => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(readingCollection, "all").and.returnValue([]);

        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        let result = readingConnector.all;
        expect(result).toEqual([]);
    })

    it("calls readingCollection.get when byId is called", () => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        let testReading = resolve(Reading);
        spyOn(readingCollection, "get").and.returnValue(testReading);

        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        let result = readingConnector.byId("123");
        expect(result).toEqual(testReading);
        expect(readingCollection.get).toHaveBeenCalledTimes(1);
        expect(readingCollection.get).toHaveBeenCalledWith(("123"));
    })

    it("calls storyplacesAPI.getAll and readingCollection.saveMany when fetchAll is called", (finished) => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(readingCollection, "saveMany").and.stub();
        spyOn(storyPlacesAPI, "getAll").and.returnValue(new Promise<Response>((success) => {
            return success(new Response("[]"));
        }));


        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        readingConnector.fetchAll().then(result => {
            expect(result).toBeUndefined();
            expect(storyPlacesAPI.getAll).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.getAll).toHaveBeenCalledWith();
            expect(readingCollection.saveMany).toHaveBeenCalledTimes(1);
            expect(readingCollection.saveMany).toHaveBeenCalledWith([]);
            finished();
        });
    })

    it("calls storyplacesAPI.getOne and readingCollection.save when fetchById is called", (finished) => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(readingCollection, "save").and.stub();
        spyOn(storyPlacesAPI, "getOne").and.returnValue(new Promise<Response>((success) => {
            return success(new Response('{"id": "123"}'));
        }));


        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        readingConnector.fetchById('123').then(result => {
            expect(result).toBeUndefined();
            expect(storyPlacesAPI.getOne).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.getOne).toHaveBeenCalledWith('123');
            expect(readingCollection.save).toHaveBeenCalledTimes(1);
            expect(readingCollection.save).toHaveBeenCalledWith({id: '123'});
            finished();
        });
    })

    it("calls storyplacesAPI.save and readingCollection.save when save is called", (finished) => {
        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        let reading = resolve(Reading);
        reading.id = '123';
        spyOn(readingCollection, "save").and.stub();
        spyOn(storyPlacesAPI, "save").and.returnValue(new Promise<Response>((success) => {
            return success(new Response('{"id": "123"}'));
        }));


        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        readingConnector.save(reading).then(result => {
            expect(result).toBeUndefined();
            expect(storyPlacesAPI.save).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.save).toHaveBeenCalledWith(reading);
            expect(readingCollection.save).toHaveBeenCalledTimes(1);
            expect(readingCollection.save).toHaveBeenCalledWith({id: '123'});
            finished();
        });
    })

    it("calls readingCollection.all and only returns items with the correct storyId when byStoryId is called", () => {
        let reading1 = resolve(Reading);
        reading1.id = '123';
        reading1.storyId = "test-story-id-1";

        let reading2 = resolve(Reading);
        reading2.id = '124';
        reading2.storyId = "test-story-id-2";

        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(readingCollection, "all").and.returnValue([reading1, reading2]);

        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        let result = readingConnector.byStoryId("test-story-id-1");
        expect(result).toEqual([reading1]);
    })

    it("calls readingCollection.all and returns empty array when there are no matching readings", () => {
        let reading1 = resolve(Reading);
        reading1.id = '123';
        reading1.storyId = "test-story-id-1";

        let reading2 = resolve(Reading);
        reading2.id = '124';
        reading2.storyId = "test-story-id-2";

        let readingCollection = resolve(ReadingCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(readingCollection, "all").and.returnValue([reading1, reading2]);

        let readingConnector = new ReadingConnector(readingCollection, storyPlacesAPI);
        let result = readingConnector.byStoryId("test-story-id-3");
        expect(result).toEqual([]);
    })
});