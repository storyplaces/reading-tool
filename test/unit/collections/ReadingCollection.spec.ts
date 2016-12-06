import {ReadingCollection} from "../../../src/resources/collections/ReadingCollection";
import {Reading} from "../../../src/resources/models/Reading";
import {Container} from 'aurelia-dependency-injection';

describe("ReadingCollection", () => {
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
        let collection = resolve(ReadingCollection);

        expect(collection.all.length).toEqual(0);
    });

    it("creates a set of Reading objects when created with an array of plain objects", () => {
        let collection = resolve(ReadingCollection, [{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Reading).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Reading objects when created with an array of Reading objects", () => {
        let model1 = resolve(Reading, {id: "1"});
        let model2 = resolve(Reading, {id: "2"});

        let collection = resolve(ReadingCollection, [model1, model2]);

        expect(collection.all[0] instanceof Reading).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Reading).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
    
    
    it("creates a Reading object when saving a plain object", () => {
        let collection = resolve(ReadingCollection);
        collection.save({id:"1"});

        expect(collection.all[0] instanceof Reading).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Reading object when saving a Reading object", () => {
        let model = resolve(Reading, {id: "1"});

        let collection = container.invoke(ReadingCollection);
        collection.save(model);

        expect(collection.all[0] instanceof Reading).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });

    it("creates a set of Reading objects when saving an array of plain objects", () => {
        let collection = resolve(ReadingCollection);
        collection.saveMany([{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Reading).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Reading objects when saving an array of Reading objects", () => {
        let model1 = resolve(Reading, {id: "1"});
        let model2 = resolve(Reading, {id: "2"});

        let collection = resolve(ReadingCollection);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Reading).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Reading).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
});
