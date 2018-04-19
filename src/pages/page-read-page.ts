/**
 * Created by andy on 28/11/16.
 */
import {autoinject, computedFrom} from "aurelia-framework";
import {Page} from "../resources/models/Page";
import {ReadingManager} from "../resources/reading/ReadingManager";
import {Router} from "aurelia-router";
import {LoggingHelper} from "../resources/logging/LoggingHelper";
import {CachedMediaConnector} from "../resources/store/CachedMediaConnector";
import {StoryCollection} from "../resources/collections/StoryCollection";

@autoinject()
export class PageReadPage {
    private storyId: string;
    private readingId: string;
    private pageId: string;

    contentElement: HTMLElement;

    constructor(private readingManager: ReadingManager, private router: Router, private loggingHelper: LoggingHelper, private cachedMediaConnector: CachedMediaConnector,
                private storyCollection: StoryCollection) {
    }

    @computedFrom('pageId', 'storyId')
    get page(): Page {
        if (!this.readingManager) {
            return undefined;
        }

        return this.readingManager.story.pages.get(this.pageId);
    }

    get finishPage(): boolean {
        return this.page.pageTransition != "next";
    }

    callPageFunctions() {
        this.readingManager.executePageFunctions(this.page);
        if (this.page.pageTransition == "next") {
            this.router.navigateBack();
        } else {
            // If it's the end of the story go to the story finish page
            this.router.navigateToRoute('story-finish', {'storyId': this.storyId});
            this.readingManager.closeReading();
        }
    }

    activate(params) {
        this.storyId = params.storyId;
        this.readingId = params.readingId;
        this.pageId = params.pageId;
        return this.readingManager.attach(this.storyId, this.readingId, false).then(() => {
            this.loggingHelper.logPageRead(this.storyCollection.get(this.storyId), this.readingId, this.pageId, this.page.name);
        });


    }

    deactivate() {
        return this.readingManager.detach();
    }

    attached() {
        this.parseImageCachedMedia();
        this.parseAudioCachedMedia();
    }

    private parseImageCachedMedia() {
        let imageElements = this.contentElement.querySelectorAll("img[data-media-id]");

        for (let index = 0; index < imageElements.length; index++) {

            let element = imageElements.item(index);
            this.setSrcOnMediaItem(element);
            element.className = "page-image";
            let html = element.outerHTML;
            element.outerHTML = "<div class='page-image-wrapper'>" + html + "</div>";
        }
    }

    private parseAudioCachedMedia() {
        let audioElements = this.contentElement.querySelectorAll("audio[data-media-id]");

        for (let index = 0; index < audioElements.length; index++) {
            let element = audioElements.item(index);
            this.setSrcOnMediaItem(element);
            element.setAttribute("controls", "");
            element.className = "page-audio";

            let width = element.clientWidth;
            let height = element.clientHeight;
            let html = element.outerHTML;
            element.outerHTML = `<div class='page-audio-wrapper' style='width: ${width}px;height: ${height}px'>` + html + "</div>";
        }
    }

    private setSrcOnMediaItem(element: Element) {
        let mediaId = element.getAttribute("data-media-id");
        let mediaSrc = this.cachedMediaConnector.getItemSrc(this.storyId, mediaId);
        if (mediaSrc) {
            element.setAttribute("src", mediaSrc);
        }
    }
}