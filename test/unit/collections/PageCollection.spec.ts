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
