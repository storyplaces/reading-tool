import {autoinject} from "aurelia-framework";
import {Config} from "../../config/Config";

import * as sanitizeHtml from "sanitize-html";

@autoinject()
export class HTMLSanitiser {

    private allowedTags;
    private allowedAttributes;

    constructor(private config: Config) {
        this.allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'];
        this.allowedAttributes = {};
    }

    public sanitisePageContent(body: string): string {
        let allowedPageTags = Array.from(this.allowedTags).concat(['img', 'audio']);
        let allowedPageAttributes = Object.assign({}, this.allowedAttributes);
        allowedPageAttributes.img = ['data-media-id'];
        allowedPageAttributes.audio = ['data-media-id'];

        if (this.config.read('scriptTagsAllowed') === true) {
            allowedPageTags = allowedPageTags.concat(['script']);
            allowedPageAttributes.script = ['type', 'async', 'defer'];
        }

        return sanitizeHtml(
            body,
            {
                allowedTags: allowedPageTags,
                allowedAttributes: allowedPageAttributes,
            }
        );
    }

    public sanitiseStoryDescription(description: string): string {
        return sanitizeHtml(
            description,
            {
                allowedTags: this.allowedTags,
                allowedAttributes: this.allowedAttributes,
            });
    }

    public sanitiseCollectionDescription(description: string): string {
        return sanitizeHtml(
            description,
            {
                allowedTags: this.allowedTags,
                allowedAttributes: this.allowedAttributes,
            });
    }
}