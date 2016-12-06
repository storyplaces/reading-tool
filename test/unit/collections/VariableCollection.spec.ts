import {VariableCollection} from "../../../src/resources/collections/VariableCollection";
import {Variable} from "../../../src/resources/models/Variable";
import {Container} from 'aurelia-dependency-injection';

describe("VariableCollection", () => {
    let container:Container;

    function resolve(object: Function, data? : any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
    });

    afterEach(() => {
        container = null;
    });

    it("can be instantiated with no data", () => {
        let collection = resolve(VariableCollection);

        expect(collection.all.length).toEqual(0);
    });

    it("creates a set of Variable objects when created with an array of plain objects", () => {
        let collection = resolve(VariableCollection, [{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Variable).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Variable objects when created with an array of Variable objects", () => {
        let model1 = resolve(Variable, {id: "1"});
        let model2 = resolve(Variable, {id: "2"});

        let collection = resolve(VariableCollection, [model1, model2]);

        expect(collection.all[0] instanceof Variable).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Variable).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
    
    
    it("creates a Variable object when saving a plain object", () => {
        let collection = resolve(VariableCollection);
        collection.save({id:"1"});

        expect(collection.all[0] instanceof Variable).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains a Variable object when saving a Variable object", () => {
        let model = resolve(Variable, {id: "1"});

        let collection = container.invoke(VariableCollection);
        collection.save(model);

        expect(collection.all[0] instanceof Variable).toBeTruthy();
        expect(collection.all[0]).toBe(model);
    });

    it("creates a set of Variable objects when saving an array of plain objects", () => {
        let collection = resolve(VariableCollection);
        collection.saveMany([{id: "1"}, {id:"2"}]);

        expect(collection.all[0] instanceof Variable).toBeTruthy();
        expect(collection.all[0].id).toEqual("1");
    });

    it("maintains an array of Variable objects when saving an array of Variable objects", () => {
        let model1 = resolve(Variable, {id: "1"});
        let model2 = resolve(Variable, {id: "2"});

        let collection = resolve(VariableCollection);
        collection.saveMany([model1, model2]);

        expect(collection.all[0] instanceof Variable).toBeTruthy();
        expect(collection.all[0]).toBe(model1);
        expect(collection.all[1] instanceof Variable).toBeTruthy();
        expect(collection.all[1]).toBe(model2);
    });
});
