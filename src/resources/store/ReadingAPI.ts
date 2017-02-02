/**
 * Created by andy on 04/01/17.
 */

import {StoryPlacesAPI} from './StoryplacesAPI';

export class ReadingAPI extends StoryPlacesAPI {

    getAllForStoryAndUser(storyId: String, userId: String): Promise<Response> {
        return this.client.fetch(this._path + "story/" + storyId +"/user/" + userId);
    }

}
