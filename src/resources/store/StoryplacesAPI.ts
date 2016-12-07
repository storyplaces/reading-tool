/**
 * Created by andy on 25/11/16.
 */

import {HttpClient} from 'aurelia-fetch-client';

let client = new HttpClient()
    .configure(config => {
        // TODO: Put these in a config file
        config
            .withBaseUrl('https://localhost:8080/storyplaces')
            .withDefaults({
                headers: {
                    'X-Auth-Token': 'thisisadefaultpass'
                }
            })

    });

export class StoryplacesAPI {

    getStoryList(): Promise<Response> {
        return client.fetch('/story');
    }

    getStory(id: String): Promise<Response> {
        return client.fetch('/story/'+id);
    }
}
