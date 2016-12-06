import {Identifiable} from "../interfaces/Identifiable";
import {JSONable} from "../interfaces/JSONable";
import {fromObjectInterface} from "../interfaces/fromObjectInterface";

export abstract class BaseModel implements Identifiable, JSONable, fromObjectInterface{
    _id: string;

    set id(id) {
        if (id != undefined && typeof id != "string") {
            throw TypeError("Unable to set id as it is not a string");
        }

        this._id = id;
    }

    get id() {
        return this._id;
    }

    public abstract toJSON();
    public abstract fromObject(any);
}