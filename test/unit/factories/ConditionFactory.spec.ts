import {Container} from "aurelia-framework";
import {ConditionFactory} from "../../../src/resources/factories/ConditionFactory";
import {ComparisonCondition} from "../../../src/resources/models/conditions/ComparisonCondition";

describe("ConditionFactory", () => {
    let container: Container;

    beforeEach(() => {
        container = new Container().makeGlobal();
        spyOn(container, 'invoke').and.returnValue(null);
    });

    afterEach(() => {
       container = null;
    });

    it("throws an error when an invalid type is passed", () => {
        let factory = new ConditionFactory().get(container);

        expect(() => {factory({type:"other"})}).toThrow();
    });

    it("invokes a ComparisonCondition when the type of condition is passed", () => {
        let factory = new ConditionFactory().get(container);
        let data = {type:"comparison"};

        factory(data);

        expect(container.invoke).toHaveBeenCalledWith(ComparisonCondition, [data]);
    });
});