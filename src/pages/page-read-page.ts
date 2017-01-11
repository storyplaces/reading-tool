/**
 * Created by andy on 28/11/16.
 */
import {autoinject, computedFrom} from "aurelia-framework";
import {Page} from "../resources/models/Page";
import {ReadingManager} from "../resources/reading/ReadingManager";
import {Router} from 'aurelia-router';

@autoinject()
export class PageReadPage {
    private storyId: string;
    private readingId: string;
    private pageId: string;


    constructor(private readingManager: ReadingManager, private router: Router) {
    }

    @computedFrom('pageId', 'storyId')
    get page(): Page {
        return this.readingManager.story.pages.get(this.pageId);
    }

    callPageFunctions() {
        this.readingManager.executePageFunctions(this.page);
        this.router.navigateBack();
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;
        this.pageId = params.pageId;

        return this.readingManager.attach(this.storyId, this.readingId, false);
    }


    deactivate() {
        return this.readingManager.detach();
    }


}