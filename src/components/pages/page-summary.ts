import {Page} from "../../resources/models/Page";
import {bindable, containerless, inject} from "aurelia-framework";

@inject(Element)
@containerless()
export class PageSummary{

    @bindable page: Page;
    @bindable storyId: string;
    @bindable readingId: string;
    @bindable demoMode: boolean;

    private element: Element;

    constructor(element: Element) {
        this.element = element;
    }

    private locatePage() {
        if (!this.demoMode) {
            return;
        }

        this.element.dispatchEvent(this.createLocateEvent(this.page.id));
    }

    private createLocateEvent(pageId: string) {
        if ((window as any).CustomEvent) {
            return new CustomEvent('locate', {bubbles: true, detail: pageId});
        }

        let changeEvent = document.createEvent('CustomEvent');
        changeEvent.initCustomEvent('locate', true, true, pageId);
        return changeEvent;
    }

}