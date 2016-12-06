/**
 * Created by kep1u13 on 06/12/2016.
 */
import {Variable} from "../../../src/resources/models/Variable";

describe("Variable model", () => {
    it("can be instantiated with no data", () => {
        let model = new Variable;

        expect(model.id).toBeUndefined();
        expect(model.value).toBeUndefined();
    });

    it("can be instantiated with an object", () => {
        let data = {id: "1", value: true};
        let model = new Variable(data);

        expect(model.id).toEqual("1");
        expect(model.value).toEqual(true);
    });

    it("can have an anonymous object passed to it", () => {
        let data = {id: "1", value: true};
        let model = new Variable();
        model.fromObject(data);

        expect(model.id).toEqual("1");
        expect(model.value).toEqual(true);
    });

    it("will convert to JSON", () => {
        let data = {id: "1", value: true};
        let model = new Variable(data);

        let result = JSON.stringify(model);

        expect(result).toEqual('{"id":"1","value":true}');
    });
});