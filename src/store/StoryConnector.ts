/**
 * Created by andy on 29/11/16.
 */


import {AbstractConnector} from "./AbstractConnector";
import {Fetch} from "./fetch";

export class StoryConnector extends AbstractConnector<Story> {

    fetch: Fetch = new Fetch();

    get all(): Array<Story> {
        return [new Story];
    }

    byId(id: string): Story {
        return new Story;
    }

    fetchAll(): Promise<Array<Story>> {
        return new Promise([new Story]);
    }

    fetchById(id: string): Promise<Story> {
        return new Promise(new Story);
    }

    save(object: Story): Promise<Story> {
        return new Promise(new Story);
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success, failure) => {
            true
        });
    }

}