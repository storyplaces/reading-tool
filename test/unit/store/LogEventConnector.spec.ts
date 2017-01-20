/**
 * Created by andy on 07/12/16.
 */
import {Container} from "aurelia-dependency-injection";
import {LogEventAPI} from "../../../src/resources/store/LogEventAPI";
import {LocalStore} from "../../../src/resources/store/LocalStore";
import {LogEventConnector} from "../../../src/resources/store/LogEventConnector";
import {LogEvent} from "../../../src/resources/models/LogEvent";

describe("LogEventConnector", () => {

    let container: Container;

    function resolve(object: Function, data?: any) {
        return container.invoke(object, [data]);
    }

    beforeEach(() => {
        container = new Container().makeGlobal();
    });

    afterEach(() => {
        container = null;
    });

    it("can be initialised with a logEventAPI and a LocalStore.", () => {
        let logEventAPI = resolve(LogEventAPI);
        let localStore = resolve(LocalStore);

        new LogEventConnector(logEventAPI, localStore);
    })

    it("save adds LogEvent to array if it is not successful.", () => {
        let logEventAPI = resolve(LogEventAPI);
        let localStore = resolve(LocalStore);

        spyOn(logEventAPI, "saveLogEvent").and.returnValue(Promise.reject(new Error("Test")));

        let logEventConnector = new LogEventConnector(logEventAPI, localStore);

        let logEvent = resolve(LogEvent, {})

        logEventConnector.save(logEvent).then((response) => {
            expect(logEventConnector.all.length).toEqual(1);
            expect(logEventConnector.all).toEqual([logEvent]);
        });


    })

    it("save calls saveLogEvent with a logEvent.", (finished) => {
        let logEventAPI = resolve(LogEventAPI);
        let localStore = resolve(LocalStore);

        spyOn(logEventAPI, "saveLogEvent").and.returnValue(new Promise<Response>((success, failure) => {
            return success(new Response('{"id": "123"}'));
        }));

        let logEventConnector = new LogEventConnector(logEventAPI, localStore);

        let logEvent = resolve(LogEvent, {})

        logEventConnector.save(logEvent).then(result => {
                expect(result).toBeUndefined();
                expect(logEventAPI.saveLogEvent).toHaveBeenCalledTimes(1);
                expect(logEventAPI.saveLogEvent).toHaveBeenCalledWith(logEvent);

                expect(logEventConnector.all.length).toEqual(0);
                expect(logEventConnector.all).toEqual([]);
                finished();
            }
        );

    })


})
;