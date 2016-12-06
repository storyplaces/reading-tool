import {Story} from "../../../src/resources/models/Story";
import {PageCollection} from "../../../src/resources/collections/PageCollection";
import {PagesMapViewSettings} from "../../../src/resources/models/PagesMapViewSettings";

describe("Story model", () => {
    let pagesMapViewSettingsFactoryCalledWith;
    let pageCollectionFactoryCalledWith;

    let pageCollectionFactory = (data) => {
        pageCollectionFactoryCalledWith = data;
        return data as PageCollection;
    };

    let pagesMapViewSettingsFactory = (data) => {
        pagesMapViewSettingsFactoryCalledWith = data;
        return data as PagesMapViewSettings;
    };

    beforeEach(() => {
        pageCollectionFactoryCalledWith = "set to something random";
        pagesMapViewSettingsFactoryCalledWith = "set to something random";
    });

    afterEach(() => {
    });

    it("can be instantiated with no data", () => {
        let model = new Story(pageCollectionFactory, pagesMapViewSettingsFactory);

        expect(model.id).toBeUndefined();
        expect(model.author).toBeUndefined();
        expect(model.cachedMediaIds).toBeUndefined();
        expect(model.conditions).toEqual(undefined);
        expect(model.description).toEqual(undefined);
        expect(model.functions).toEqual(undefined);
        expect(model.pages).toEqual(undefined);
        expect(model.pagesMapViewSettings).toEqual(undefined);
        expect(model.name).toEqual(undefined);
        expect(model.tags).toEqual(undefined);
        expect(pageCollectionFactoryCalledWith).toBeUndefined();
        expect(pagesMapViewSettingsFactoryCalledWith).toBeUndefined();
    });

    it("can be instantiated with data", () => {
        let data = {
            id: "id", name: "name", cachedMediaIds: ["cachedMediaId"], conditions: [{id: "condition"}], description: "description", functions: [{id: "function"}],
            pages: [{id: "page"}], pagesMapViewSettings: {setting: true}, author: "author", tags: ["tag"]
        };

        let model = new Story(pageCollectionFactory, pagesMapViewSettingsFactory, data);

        expect(model.id).toEqual("id");
        expect(model.author).toEqual("author");
        expect(model.cachedMediaIds).toEqual(["cachedMediaId"]);
        expect(model.conditions).toEqual([{id: "condition"}]);
        expect(model.description).toEqual("description");
        expect(model.functions).toEqual([{id: "function"}]);
        expect(model.pages).toEqual([{id: "page"}]);
        expect(model.pagesMapViewSettings).toEqual({setting: true});
        expect(model.name).toEqual("name");
        expect(model.tags).toEqual(["tag"]);
        expect(pageCollectionFactoryCalledWith).toEqual([{id: "page"}]);
        expect(pagesMapViewSettingsFactoryCalledWith).toEqual({setting: true});
    });

    it("can have an anonymous Object passed to it", () => {
        let data = {
            id: "id", name: "name", cachedMediaIds: ["cachedMediaId"], conditions: [{id: "condition"}], description: "description", functions: [{id: "function"}],
            pages: [{id: "page"}], pagesMapViewSettings: {setting: true}, author: "author", tags: ["tag"]
        };

        let model = new Story(pageCollectionFactory, pagesMapViewSettingsFactory);
        model.fromObject(data);

        expect(model.id).toEqual("id");
        expect(model.author).toEqual("author");
        expect(model.cachedMediaIds).toEqual(["cachedMediaId"]);
        expect(model.conditions).toEqual([{id: "condition"}]);
        expect(model.description).toEqual("description");
        expect(model.functions).toEqual([{id: "function"}]);
        expect(model.pages).toEqual([{id: "page"}]);
        expect(model.pagesMapViewSettings).toEqual({setting: true});
        expect(model.name).toEqual("name");
        expect(model.tags).toEqual(["tag"]);
        expect(pageCollectionFactoryCalledWith).toEqual([{id: "page"}]);
        expect(pagesMapViewSettingsFactoryCalledWith).toEqual({setting: true});
    });

    it("can have JSON passed to it", () => {
        let data = {
            id: "id", name: "name", cachedMediaIds: ["cachedMediaId"], conditions: [{id: "condition"}], description: "description", functions: [{id: "function"}],
            pages: [{id: "page"}], pagesMapViewSettings: {setting: true}, author: "author", tags: ["tag"]
        };

        let model = new Story(pageCollectionFactory, pagesMapViewSettingsFactory, data);

        let result = JSON.stringify(model);

        expect(result).toEqual('{"id":"id","author":"author","cachedMediaIds":["cachedMediaId"],"conditions":[{"id":"condition"}],"description":"description","functions":[{"id":"function"}],"pages":[{"id":"page"}],"pagesMapViewSettings":{"setting":true},"name":"name","tags":["tag"]}');
    });

});