import {StoryCollection} from "../../../src/resources/collections/StoryCollection";
import {Story} from "../../../src/resources/models/Story";
import {Container} from 'aurelia-dependency-injection';



describe("StoryCollection", () => {
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
        let collection = resolve(StoryCollection);

        expect(collection.all.length).toEqual(0);
    });

    it("creates a set of Story objects when created with an array of plain objects", () => {
        let collection = resolve(StoryCollection, [{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Story objects when created with an array of Story objects", () => {
        let model1 = resolve(Story,  {id: "1"});
        let model2 = resolve(Story,  {id: "2"});

        let collection = resolve(StoryCollection, [model1, model2]);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Story).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
    
    
    it("creates a Story object when saving a plain object", () => {
        let collection = resolve(StoryCollection);
        collection.save({id:"1"});

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Story object when saving a Story object", () => {
        let model = resolve(Story,  {id: "1"});

        let collection = container.invoke(StoryCollection);
        collection.save(model);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });

    it("creates a set of Story objects when saving an array of plain objects", () => {
        let collection = resolve(StoryCollection);
        collection.saveMany([{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Story objects when saving an array of Story objects", () => {
        let model1 = resolve(Story, {id: "1"});
        let model2 = resolve(Story, {id: "2"});

        let collection = resolve(StoryCollection);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Story).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
});
