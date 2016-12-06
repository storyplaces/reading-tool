/**
 * Created by kep1u13 on 06/12/2016.
 */
import {Container} from "aurelia-framework";
import {BaseModel} from "../../../src/resources/models/BaseModel";

describe("BaseModel", () => {
    let container: Container;

    class TestModel extends BaseModel {

        toJSON() {
        }

        fromObject({id = undefined}) {
            this.id = id;
        }
    }

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
    });

    afterEach(() => {
        container = null;
    });


    it("will throw an error if id is set to something other than a string", () => {
        let model = resolve(TestModel);

        expect(() => {
            model.id = 1
        }).toThrow();

        expect(() => {
            model.id = false
        }).toThrow();

        expect(() => {
            model.id = {}
        }).toThrow();

        expect(() => {
            model.id = () => {
            }
        }).toThrow();
    });

    it("will throw an error if id is passed to fromObject as something other than a string", () => {
        let model = resolve(TestModel);

        expect(() => {
            model.fromObject({id: 1})
        }).toThrow();

        expect(() => {
            model.fromObject({id: false})
        }).toThrow();

        expect(() => {
            model.fromObject({id: {}})
        }).toThrow();

        expect(() => {
            model.fromObject({
                id: () => {
                }
            })
        }).toThrow();
    });

    it("will not throw an error if id is set to a string", () => {
        let model = resolve(TestModel);

        model.id = "1";

        expect(model.id).toEqual("1");
    });

    it("will have toJSON called when passed to JSONStringify", () => {
        let model = resolve(TestModel);

        spyOn(model, 'toJSON').and.returnValue({test: true});

        let result = JSON.stringify(model);

        expect(model.toJSON).toHaveBeenCalledTimes(1);
        expect(result).toEqual('{"test":true}');
    })
});