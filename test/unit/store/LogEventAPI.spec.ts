/**
 * Created by andy on 07/12/16.
 */

import {Container} from 'aurelia-dependency-injection';
import {HttpClient} from "aurelia-fetch-client";
import {Config} from "../../../src/config/Config";
import {LogEventAPI} from "../../../src/resources/store/LogEventAPI";
import {LogEvent} from "../../../src/resources/models/LogEvent";

describe("LogEventAPI", () => {

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

    it("calls fetch client with a post request when saveLogEvent called", (finished) => {
        let client = resolve(HttpClient);
        spyOn(client, "fetch").and.returnValue(new Promise((success, failure) => {
                return success(new Response("[]"));
            })
        );
        let data = {
            user: "user_1",
            type: "type_1",
            date: "date_1",
            data: {testField: "someData"}
        };
        let api = new LogEventAPI(client, config);
        api.path = "/LogEvent/";
        var logEvent: LogEvent = resolve(LogEvent, data);

        api.saveLogEvent(logEvent).then((result) => {
            expect(result).toEqual(new Response("[]"));
            expect(client.fetch).toHaveBeenCalledTimes(1);
            expect(client.fetch).toHaveBeenCalledWith(api.path, {method: "post", body: '{"user":"user_1","type":"type_1","date":"date_1","data":{"testField":"someData"}}'});
            finished();
        });
    });

});