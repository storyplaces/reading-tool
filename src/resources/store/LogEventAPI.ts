/**
 * Created by andy on 04/01/17.
 */
import {StoryPlacesAPI} from "./StoryplacesAPI";
import {LogEvent} from "../models/LogEvent";

export class LogEventAPI extends StoryPlacesAPI {

    saveLogEvent(object: LogEvent): Promise<Response> {
        let method = 'post';
        let path = this._path;
        return this.client.fetch(path, {
            method: method,
            body: JSON.stringify(object)
        });

    }
}
