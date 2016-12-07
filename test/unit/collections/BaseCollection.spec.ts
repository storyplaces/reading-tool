import {BaseCollection} from "../../../src/resources/collections/BaseCollection";
import {Identifiable} from "../../../src/resources/interfaces/Identifiable";

describe("Base collection", () => {
    type TestModel = {
        id: string;
        data: string;
    }

    class TestCollection extends BaseCollection<TestModel> {
        // Make this public so we can spy on it.
        public itemFromObject(item) {
            return item;
        }
    }

    it("can be instantiated with no data", () => {
        let collection = new TestCollection();

        expect(collection.all.length).toEqual(0);
    });

   it("can have single objects added to it", () => {
        let collection = new TestCollection;

        spyOn(collection, 'itemFromObject').and.callThrough();

        collection.save({id: "1", data: "data1"});
        collection.save({id: "2", data: "data2"});

        expect(collection.get("1").id).toEqual("1");
        expect(collection.get("1").data).toEqual("data1");
        expect(collection.get("2").id).toEqual("2");
        expect(collection.get("2").data).toEqual("data2");

        expect(collection.itemFromObject).toHaveBeenCalledTimes(2);
        expect(collection.itemFromObject).toHaveBeenCalledWith({id: "1", data: "data1"});
        expect(collection.itemFromObject).toHaveBeenCalledWith({id: "2", data: "data2"});
    });

    it("can have multiple objects added to it", () => {
        let collection = new TestCollection;

        spyOn(collection, 'itemFromObject').and.callThrough();

        collection.saveMany([{id: "1", data: "data1"}, {id: "2", data: "data2"}]);

        expect(collection.get("1").id).toEqual("1");
        expect(collection.get("1").data).toEqual("data1");
        expect(collection.get("2").id).toEqual("2");
        expect(collection.get("2").data).toEqual("data2");

        expect(collection.itemFromObject).toHaveBeenCalledTimes(2);
        expect(collection.itemFromObject).toHaveBeenCalledWith({id: "1", data: "data1"});
        expect(collection.itemFromObject).toHaveBeenCalledWith({id: "2", data: "data2"});
    });

    it("will expose all the models on .all", () => {
        let collection = new TestCollection;
        collection.saveMany([{id: "1", data: "data1"}, {id: "2", data: "data2"}]);

        expect(collection.all.length).toEqual(2);
        expect(collection.all.findIndex(item => item.id == "1")).not.toEqual(-1);
        expect(collection.all.findIndex(item => item.id == "2")).not.toEqual(-1);
        expect(collection.all.find(item => item.id == "1").data).toEqual("data1");
        expect(collection.all.find(item => item.id == "2").data).toEqual("data2");
    });

    it("will return and object via get", () => {
        let model1 = {id: "1", data: "data1"};
        let model2 = {id: "2", data: "data2"};
        let collection = new TestCollection;
        collection.saveMany([model1, model2]);

        expect(collection.get("1").id).toEqual("1");
        expect(collection.get("1").data).toEqual("data1");
        expect(collection.get("2").id).toEqual("2");
        expect(collection.get("2").data).toEqual("data2");
    });

    it("can have items deleted from it", () => {
        let collection = new TestCollection;
        collection.saveMany([{id: "1"}, {id: "2"}]);

        collection.remove("1");

        expect(collection.all.length).toEqual(1);
        expect(collection.all.findIndex(item => item.id == "1")).toEqual(-1);
        expect(collection.all.findIndex(item => item.id == "2")).not.toEqual(-1);
    });

    it("will return null when get is called with an invalid id", () => {
        let collection = new TestCollection;
        collection.saveMany([{id: "1"}, {id: "2"}]);

        expect(collection.get("1234")).toBeUndefined();
    });

    it("will overwrite an entry if the id key matches", () => {
        let model1 = {id: "1", data: "data1"};
        let model2 = {id: "2", data: "data2"};
        let model2Alternative = {id: "2", data: "dataAlternative"};

        let collection = new TestCollection;
        collection.saveMany([model1, model2]);

        collection.save(model2Alternative);

        expect(collection.get("1").id).toEqual("1");
        expect(collection.get("1").data).toEqual("data1");
        expect(collection.get("2").id).toEqual("2");
        expect(collection.get("2").data).toEqual("dataAlternative");
    });

    it("will return a JSON array when passed to JSON.stringify", () => {
        let model1 = {id: "1", data: "data1"};
        let model2 = {id: "2", data: "data2"};
        let collection = new TestCollection;

        collection.saveMany([model1, model2]);

        spyOn(collection, 'toJSON').and.callThrough();

        let result = JSON.stringify(collection);

        expect(collection.toJSON).toHaveBeenCalledTimes(1);

        expect(result).toEqual('[{"id":"1","data":"data1"},{"id":"2","data":"data2"}]');
    });

    it("will return an array of objects when toArray is called", () => {
        let model1 = {id: "1", data: "data1"};
        let model2 = {id: "2", data: "data2"};
        let collection = new TestCollection;
        collection.saveMany([model1, model2]);

        let result = collection.toArray();

        expect(Array.isArray(result)).toBeTruthy();

        expect(result[0].id).toEqual("1");
        expect(result[0].data).toEqual("data1");
        expect(result[1].id).toEqual("2");
        expect(result[1].data).toEqual("data2");
    });

    it("will handle forEach correctly", () => {
        let model1 = {id: "1", data: "data1"};
        let model2 = {id: "2", data: "data2"};
        let collection = new TestCollection;
        collection.saveMany([model1, model2]);

        let counter = 0;

        collection.forEach(item => {
            counter++;
            expect(item.id).toEqual(counter.toString());
            expect(item.data).toEqual("data" + counter.toString());
        });

        expect(counter).toEqual(2);
    });

    it("will throw an error if a model with no is saved", () => {
        let model1 = {};
        let collection = new TestCollection;

        let test = () => {
            collection.saveMany([model1])
        };

        expect(test).toThrow();
    });
});

