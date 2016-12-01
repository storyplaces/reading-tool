import {StoryCollection} from "../../../src/resources/collections/StoryCollection";
import {Story} from "../../../src/resources/models/Story";


describe("StoryCollection", () => {
    it("creates a Story object when passed a plain object", () => {
        let collection = new StoryCollection([{id: "1"}]);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Story object when passed a Story object", () => {
        let model = new Story({id:"1"});
        let collection = new StoryCollection([model]);

        expect(collection.all[0] instanceof Story).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });
});
