/**
 * Created by andy on 07/12/16.
 */

import {StoryConnector} from '../../../src/resources/store/StoryConnector'
import {Container} from 'aurelia-dependency-injection';
import {StoryCollection} from "../../../src/resources/collections/StoryCollection";
import {StoryPlacesAPI} from "../../../src/resources/store/StoryplacesAPI";
import {Story} from "../../../src/resources/models/Story";

describe("StoryConnector", () => {

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

    it("can be instantiated with a StoryCollection and a storyplacesAPI", () => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);

        new StoryConnector(storyCollection, storyPlacesAPI);
    });

    it("sets the storyPlacesAPI path to /stories/", () => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);

        new StoryConnector(storyCollection, storyPlacesAPI);
        expect(storyPlacesAPI.path).toEqual("/stories/");

    });

    it("returns storyCollection.all when all is called", () => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(storyCollection, "all").and.returnValue([]);

        let storyConnector = new StoryConnector(storyCollection, storyPlacesAPI);
        let result = storyConnector.all;
        expect(result).toEqual([]);
    })

    it("calls storyCollection.get when byId is called", () => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        let testStory = resolve(Story);
        spyOn(storyCollection, "get").and.returnValue(testStory);

        let storyConnector = new StoryConnector(storyCollection, storyPlacesAPI);
        let result = storyConnector.byId("123");
        expect(result).toEqual(testStory);
        expect(storyCollection.get).toHaveBeenCalledTimes(1);
        expect(storyCollection.get).toHaveBeenCalledWith(("123"));
    })

    it("calls storyplacesAPI.getAll and storyCollection.saveMany when fetchAll is called", (finished) => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(storyCollection, "saveMany").and.stub();
        spyOn(storyPlacesAPI, "getAll").and.returnValue(new Promise<Response>((success) => {
            return success(new Response("[]"));
        }));


        let storyConnector = new StoryConnector(storyCollection, storyPlacesAPI);
        storyConnector.fetchAll().then(result => {
            expect(result).toBeUndefined();
            expect(storyPlacesAPI.getAll).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.getAll).toHaveBeenCalledWith();
            expect(storyCollection.saveMany).toHaveBeenCalledTimes(1);
            expect(storyCollection.saveMany).toHaveBeenCalledWith([]);
            finished();
        });
    })

    it("calls storyplacesAPI.getOne and storyCollection.save when fetchById is called", (finished) => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(storyCollection, "save").and.stub();
        spyOn(storyPlacesAPI, "getOne").and.returnValue(new Promise<Response>((success) => {
            return success(new Response('{"id": "123"}'));
        }));


        let storyConnector = new StoryConnector(storyCollection, storyPlacesAPI);
        storyConnector.fetchById('123').then(result => {
            expect(result).toBeUndefined();
            expect(storyPlacesAPI.getOne).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.getOne).toHaveBeenCalledWith('123');
            expect(storyCollection.save).toHaveBeenCalledTimes(1);
            expect(storyCollection.save).toHaveBeenCalledWith({id: '123'});
            finished();
        });
    })

    it("calls storyplacesAPI.save and storyCollection.save when save is called", (finished) => {
        let storyCollection = resolve(StoryCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        let story = resolve(Story);
        story.id = '123';
        spyOn(storyCollection, "save").and.stub();
        spyOn(storyPlacesAPI, "save").and.returnValue(new Promise<Response>((success) => {
            return success(new Response('{"id": "123"}'));
        }));


        let storyConnector = new StoryConnector(storyCollection, storyPlacesAPI);
        storyConnector.save(story).then(result => {
            expect(result).toBeUndefined();
            expect(storyPlacesAPI.save).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.save).toHaveBeenCalledWith(story);
            expect(storyCollection.save).toHaveBeenCalledTimes(1);
            expect(storyCollection.save).toHaveBeenCalledWith({id: '123'});
            finished();
        });
    })


});