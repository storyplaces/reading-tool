import {VariableCollection} from "../../../src/resources/collections/VariableCollection";
import {Page} from "../../../src/resources/models/Page";

describe("Page model", () => {
    let factoryCalledWith;

    // let factory = (data) => {
    //     factoryCalledWith = data;
    //     return data as VariableCollection;
    // };

    beforeEach(() => {
        factoryCalledWith = "set to something random";
    });

    afterEach(() => {
    });

    it("can be instantiated with no data", () => {
        let model = new Page();

        expect(model.id).toBeUndefined();
        expect(model.name).toBeUndefined();
        expect(model.conditions).toBeUndefined();
    });

    it("can be instantiated with data", () => {
        let model = new Page({id: "1", name: "name", conditions: [{id: "2"}]});

        expect(model.id).toEqual("1");
        expect(model.name).toEqual("name");
        expect(model.conditions).toEqual([{id: "2"}]);

    });

    it("can have an anonymous object passed to it", () => {
        let model = new Page();

        model.fromObject({id: "1", name: "name", conditions: [{id: "2"}]});

        expect(model.id).toEqual("1");
        expect(model.name).toEqual("name");
        expect(model.conditions).toEqual([{id: "2"}]);
    });

    it("can be cast to JSON", () => {
        let model = new Page({id: "1", name: "name", conditions: [{id: "2"}]});

        let result = JSON.stringify(model);

        expect(result).toEqual('{"id":"1","name":"name","conditions":[{"id":"2"}]}');
    });
});