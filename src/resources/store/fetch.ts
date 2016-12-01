/**
 * Created by andy on 25/11/16.
 */

import {HttpClient} from 'aurelia-fetch-client';

let client = new HttpClient()
    .configure(config => {
        config
            .withBaseUrl('https://localhost:8080/storyplaces')
            .withDefaults({
                headers: {
                    'X-Auth-Token': 'thisisadefaultpass'
                }
            })

    });

export class Fetch {

    getStoryList(): Promise<Response> {
        return client.fetch('/story');
    }

    getStory(id: String): Promise<Response> {
        return client.fetch('/story/'+id);
    }
}
