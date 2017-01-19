import {bindable} from "aurelia-framework";
import {ReadingManager} from "../../resources/reading/ReadingManager";
/**
 * Created by andy on 28/11/16.
 */

export class PageListCustomElement {

    @bindable readingManager: ReadingManager;

    readingId: string;
    storyId:string;

    bind() {
        this.readingId = this.readingManager.reading.id;
        this.storyId = this.readingManager.story.id;
        console.log(this.readingId, this.storyId);
    }

}