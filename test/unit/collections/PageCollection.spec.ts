import {PageCollection} from "../../../src/resources/collections/PageCollection";
import {Page} from "../../../src/resources/models/Page";


describe("PageCollection", () => {
    it("creates a Page object when passed a plain object", () => {
        let collection = new PageCollection([{id: "1"}]);
        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Page object when passed a Page object", () => {
        let model = new Page({id:"1"});
        let collection = new PageCollection([model]);

        expect(collection.all[0] instanceof Page).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });
});
