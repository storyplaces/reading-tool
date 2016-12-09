/**
 * Created by andy on 07/12/16.
 */

import {StoryPlacesAPI} from '../../../src/resources/store/StoryplacesAPI'
import {Container} from 'aurelia-dependency-injection';
import {HttpClient} from "aurelia-fetch-client";
import {Identifiable} from "../../../src/resources/interfaces/Identifiable";
import {JSONable} from "../../../src/resources/interfaces/JSONable";
import {Config} from "../../../src/config/Config";

describe("StoryPlacesAPI", () => {

    let container: Container;

    class TestIdentifiable implements Identifiable, JSONable {
        toJSON() {
            return {data: "test"}
        }

        id: string;

    }

    let config = new Config();

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
    });

    afterEach(() => {
        container = null;
    });

    it("can be instantiated and have an unset path", () => {
        let client = resolve(HttpClient);
        let api = new StoryPlacesAPI(client, config);

        expect(api.path).toBeUndefined();
    });

    it("can have its path set using the path setter", () => {
        let client = resolve(HttpClient);
        let api = new StoryPlacesAPI(client, config);
        api.path = "/stories/"

        expect(api.path).toEqual("/stories/");
    });

    it("adds a trailing slash when setting a path without one", () => {
        let client = resolve(HttpClient);
        let api = new StoryPlacesAPI(client, config);
        api.path = "/stories"

        expect(api.path).toEqual("/stories/");
    });

    it("calls fetch client with a get request when getting all", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        let api = new StoryPlacesAPI(client, config);
        api.path = "/stories/"

        api.getAll().then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path);
            finished();
        });
    });

    it("calls fetch client with a get request when getting one", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        let api = new StoryPlacesAPI(client, config);
        api.path = "/stories/"

        api.getOne("123").then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path + "123");
            finished();
        });
    });

    it("calls fetch client with a post request saving something with no id", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        let api = new StoryPlacesAPI(client, config);
        api.path = "/stories/"
        let testObjectNoId = new TestIdentifiable();

        api.save(testObjectNoId).then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path, {
                method: "post",
                body: JSON.stringify(testObjectNoId.toJSON())
            });
            finished();
        });
    });

    it("calls fetch client with a put request saving something with an id", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        let api = new StoryPlacesAPI(client, config);
        api.path = "/stories/"
        let testObjectNoId = new TestIdentifiable();
        testObjectNoId.id = "1";

        api.save(testObjectNoId).then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path, {
                method: "put",
                body: JSON.stringify(testObjectNoId.toJSON())
            });
            finished();
        });
    });

});