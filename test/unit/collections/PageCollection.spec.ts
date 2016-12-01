import {PageCollection} from "../../../src/resources/collections/PageCollection";
import {Page} from "../../../src/resources/models/Page";
import {PageFactory} from "../../../src/resources/models/factories/PageFactory";

let pageFactory = new PageFactory;

describe("PageCollection", () => {
    it("creates a Page object when passed a plain object", () => {
        let collection = new PageCollection(pageFactory);
        collection.save({id: "1"});

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Page object when passed a Page object", () => {
        let model = pageFactory.make();

        let collection = new PageCollection(pageFactory);
        collection.save(model);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });

    it("creates a set of Page objects when passed an array of plain objects", () => {
        let collection = new PageCollection(pageFactory);
        collection.saveMany([{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Page objects when passed an array of Page objects", () => {
        let model1 = new pageFactory.make();
        let model2 = new pageFactory.make();

        let collection = new PageCollection(pageFactory);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Page).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
});
