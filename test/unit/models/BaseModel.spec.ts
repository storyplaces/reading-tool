/**
 * Created by kep1u13 on 06/12/2016.
 */
import {BaseModel} from "../../../src/resources/models/BaseModel";

describe("BaseModel", () => {

    class TestModel extends BaseModel {

        toJSON() {
        }

        fromObject({id = undefined}) {
            this.id = id;
        }
    }


    it("will throw an error if id is set to something other than a string", () => {
        let model = new TestModel;

        expect(() => {
            model.id = 1 as any
        }).toThrow();

        expect(() => {
            model.id = false as any
        }).toThrow();

        expect(() => {
            model.id = {} as any
        }).toThrow();

        expect(() => {
            model.id = function () {
            } as any
        }).toThrow();
    });

    it("will throw an error if id is passed to fromObject as something other than a string", () => {
        let model = new TestModel;

        expect(() => {
            model.fromObject({id: 1} as any)
        }).toThrow();

        expect(() => {
            model.fromObject({id: false} as any)
        }).toThrow();

        expect(() => {
            model.fromObject({id: {}} as any)
        }).toThrow();

        expect(() => {
            model.fromObject({
                id: function () {
                } as any
            })
        }).toThrow();
    });

    it("will not throw an error if id is set to a string", () => {
        let model = new TestModel;

        model.id = "1";

        expect(model.id).toEqual("1");
    });

    it("will have toJSON called when passed to JSONStringify", () => {
        let model = new TestModel;

        spyOn(model, 'toJSON');

        JSON.stringify(model);

        expect(model.toJSON).toHaveBeenCalledTimes(1);
    })
});