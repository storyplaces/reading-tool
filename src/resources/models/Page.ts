import {Identifiable} from "../interfaces/Identifiable";

export class Page implements Identifiable {
    id: string;
    label: string;
    conditions: Object;

    constructor({id = '', label = '', conditions = ''}) {
        this.id = id;
        this.label = label;
        this.conditions = conditions;
    }

    public toJSON() {
        return {
            id: this.id,
            label: this.label,
            conditions: this.conditions,
        }
    }
}