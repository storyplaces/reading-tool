import {ComparisonCondition} from "../models/conditions/ComparisonCondition";
import {resolver, Container} from "aurelia-framework";
import {BaseCondition} from "../models/conditions/BaseCondition";

type comparisonObject= {
    type: string;
}

@resolver()
export class ConditionFactory {
    public get(container: Container) {
        return (data: comparisonObject): BaseCondition => {
            switch (data.type) {
                case 'comparison':
                    return container.invoke(ComparisonCondition, [data]);
                default:
                    throw TypeError("Bad comparison type");
            }
        }
    }
}