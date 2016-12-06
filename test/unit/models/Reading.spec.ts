import {Reading} from "../../../src/resources/models/Reading";
import {VariableCollection} from "../../../src/resources/collections/VariableCollection";

describe("Reading model", () => {
    let factoryCalledWith;

    let factory = (data) => {
        factoryCalledWith = data;
        return data as VariableCollection;
    };

    beforeEach(() => {
        factoryCalledWith = "set to something random";
    });

    afterEach(() => {
    });

    it("can be instantiated with no data", () => {
        let model = new Reading(factory);

        expect(model.id).toBeUndefined();
        expect(model.readingId).toBeUndefined();
        expect(model.userId).toBeUndefined();
        expect(model.variables).toEqual(undefined);
        expect(factoryCalledWith).toBeUndefined();
    });

    it("can be instantiated with data", () => {
        let model = new Reading(factory, {id: "1", readingId: "reading", userId: "user", variables: [{id: "2"}]});

        expect(model.id).toEqual("1");
        expect(model.readingId).toEqual("reading");
        expect(model.userId).toEqual("user");
        expect(model.variables).toEqual([{id: "2"}]);
        expect(factoryCalledWith).toEqual([{id: "2"}]);
    });

    it("can have an anonymous object passed to it", () => {
        let model = new Reading(factory);

        model.fromObject({id: "1", readingId: "reading", userId: "user", variables: [{id: "2"}]});

        expect(model.id).toEqual("1");
        expect(model.readingId).toEqual("reading");
        expect(model.userId).toEqual("user");
        expect(model.variables).toEqual([{id: "2"}]);
        expect(factoryCalledWith).toEqual([{id: "2"}]);
    });

    it("can be cast to JSON", () => {
        let model = new Reading(factory, {id: "1", readingId: "reading", userId: "user", variables: [{id: "2"}]});

        let result = JSON.stringify(model);

        expect(result).toEqual('{"id":"1","readingId":"reading","userId":"user","variables":[{"id":"2"}]}');
    });
});