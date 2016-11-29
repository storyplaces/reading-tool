import {Identifiable} from "../interfaces/Identifiable";

export abstract class BaseCollection<DATA_TYPE extends Identifiable> {

    private _data: Array<DATA_TYPE> = [];

    constructor(data: Array<any> = []) {
        this.saveMany(data);
    }

    get length(): number {
        return this._data.length;
    }

    get all(): Array<DATA_TYPE> {
        return this._data;
    }

    public get(id: string): DATA_TYPE {
        return this._data.find(item => item.id == id)
    }

    public save(passedItem: any): void {
        let item = this.fromJSON(passedItem);

        let foundIndex = this.findIndex(item);

        if (foundIndex) {
            this._data[foundIndex] = item;
            return
        }

        this._data.push(item);
    }

    private findIndex(item: DATA_TYPE): number|null {
        return this.findIndexById(item.id);
    }

    private findIndexById(itemId: string): number|null {
        let foundIndex = this._data.findIndex(found => found.id == itemId);
        return foundIndex != -1 ? foundIndex : null;
    }

    public saveMany(items: Array<any>): void {
        items.forEach(item => {
            this.save(item)
        });
    }

    public remove(id: string): void {
        let foundIndex = this.findIndexById(id);

        if (foundIndex) {
            this._data.splice(foundIndex, 1);
        }
    }

    public toArray(): Array<DATA_TYPE> {
        return this._data;
    }

    public toJSON(): Array<DATA_TYPE> {
        return this._data;
    }

    public forEach(callback, thisArg) {
        this._data.forEach(callback, thisArg);
    }

    protected fromJSON(item: any): DATA_TYPE {
        return item as DATA_TYPE;
    }
}