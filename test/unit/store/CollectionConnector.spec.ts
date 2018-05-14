/**
 * Created by andy on 07/12/16.
 */

import {Container} from "aurelia-framework";
import {StoryPlacesAPI} from "../../../src/resources/store/StoryplacesAPI";
import {CollectionCollection} from "../../../src/resources/collections/CollectionCollection";
import {CollectionConnector} from "../../../src/resources/store/CollectionConnector";
import {Collection} from "../../../src/resources/models/Collection";

describe("CollectionConnector", () => {

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

    it("can be instantiated with a CollectionCollection and a storyplacesAPI", () => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);

        new CollectionConnector(collectionCollection, storyPlacesAPI);
    });

    it("sets the storyPlacesAPI path to /collection/", () => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);

        new CollectionConnector(collectionCollection, storyPlacesAPI);
        expect(storyPlacesAPI.path).toEqual("/collection/");

    });

    it("returns collectionCollection.all when all is called", () => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(collectionCollection, "all").and.returnValue([]);

        let collectionConnector = new CollectionConnector(collectionCollection, storyPlacesAPI);
        let result = collectionConnector.all;
        expect(result).toEqual([]);
    });

    it("calls collectionCollection.get when byId is called", () => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        let testStory = resolve(Collection);
        spyOn(collectionCollection, "get").and.returnValue(testStory);

        let collectionConnector = new CollectionConnector(collectionCollection, storyPlacesAPI);
        let result = collectionConnector.byId("123");
        expect(result).toEqual(testStory);
        expect(collectionCollection.get).toHaveBeenCalledTimes(1);
        expect(collectionCollection.get).toHaveBeenCalledWith(("123"));
    });

    it("calls storyplacesAPI.getAll and collectionCollection.saveMany when fetchAll is called", (finished) => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(collectionCollection, "saveMany").and.stub();
        spyOn(storyPlacesAPI, "getAll").and.returnValue(new Promise<Response>((success) => {
            return success(new Response("[]"));
        }));


        let collectionConnector = new CollectionConnector(collectionCollection, storyPlacesAPI);
        collectionConnector.fetchAll().then(result => {
            expect(result).toEqual([]);
            expect(storyPlacesAPI.getAll).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.getAll).toHaveBeenCalledWith();
            expect(collectionCollection.saveMany).toHaveBeenCalledTimes(1);
            expect(collectionCollection.saveMany).toHaveBeenCalledWith([]);
            finished();
        });
    });

    it("calls storyplacesAPI.getOne and collectionCollection.save when fetchById is called", (finished) => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        spyOn(collectionCollection, "save").and.stub();
        spyOn(storyPlacesAPI, "getOne").and.returnValue(new Promise<Response>((success) => {
            return success(new Response('{"id": "123"}'));
        }));


        let collectionConnector = new CollectionConnector(collectionCollection, storyPlacesAPI);
        collectionConnector.fetchById('123').then(result => {
            expect(result).toEqual({id: '123'});
            expect(storyPlacesAPI.getOne).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.getOne).toHaveBeenCalledWith('123');
            expect(collectionCollection.save).toHaveBeenCalledTimes(1);
            expect(collectionCollection.save).toHaveBeenCalledWith({id: '123'});
            finished();
        });
    });

    it("calls storyplacesAPI.save and collectionCollection.save when save is called", (finished) => {
        let collectionCollection = resolve(CollectionCollection);
        let storyPlacesAPI = resolve(StoryPlacesAPI);
        let story = resolve(Collection);
        story.id = '123';
        spyOn(collectionCollection, "save").and.stub();
        spyOn(storyPlacesAPI, "save").and.returnValue(new Promise<Response>((success) => {
            return success(new Response('{"id": "123"}'));
        }));


        let collectionConnector = new CollectionConnector(collectionCollection, storyPlacesAPI);
        collectionConnector.save(story).then(result => {
            expect(result).toEqual({id: '123'});
            expect(storyPlacesAPI.save).toHaveBeenCalledTimes(1);
            expect(storyPlacesAPI.save).toHaveBeenCalledWith(story);
            expect(collectionCollection.save).toHaveBeenCalledTimes(1);
            expect(collectionCollection.save).toHaveBeenCalledWith({id: '123'});
            finished();
        });
    })


});