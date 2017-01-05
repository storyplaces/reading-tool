/**
 * Created by andy on 07/12/16.
 */

import {StoryPlacesAPI} from '../../../src/resources/store/StoryplacesAPI'
import {Container} from 'aurelia-dependency-injection';
import {HttpClient} from "aurelia-fetch-client";
import {Identifiable} from "../../../src/resources/interfaces/Identifiable";
import {JSONable} from "../../../src/resources/interfaces/JSONable";
import {Config} from "../../../src/config/Config";
import {ReadingAPI} from "../../../src/resources/store/ReadingAPI";

describe("ReadingAPI", () => {

    let container: Container;

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

    it("calls fetch client with a get request when getAllForStory called", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        var storyId = "123456";
        let api = new ReadingAPI(client, config);
        api.path = "/reading/";

        api.getAllForStory(storyId).then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path + "story/" + storyId);
            finished();
        });
    });

    it("calls fetch client with a get request when getAllForStoryAndUser called", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        var storyId = "123456";
        var userId = "987654";
        let api = new ReadingAPI(client, config);
        api.path = "/reading/";

        api.getAllForStoryAndUser(storyId, userId).then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path + "story/" + storyId + "/user/" + userId);
            finished();
        });
    });

});