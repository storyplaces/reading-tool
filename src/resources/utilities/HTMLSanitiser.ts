import {autoinject} from "aurelia-framework";
import {Config} from "../../config/Config";

import * as sanitizeHtml from "sanitize-html";

@autoinject()
export class HTMLSanitiser {

    private allowedTags;
    private allowedAttributes;

    constructor(private config: Config) {
        this.allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'];
        this.allowedAttributes = {
            'a': ['href', 'target'],
            'div': ['class']
        };
    }

    public sanitisePageContent(body: string): string {
        if (body === undefined) {
            return;
        }

        let allowedPageTags = Array.from(this.allowedTags).concat(['iframe', 'img', 'audio']);
        let allowedPageAttributes = Object.assign({'iframe': ['src', 'frameborder', 'allowfullscreen', 'allow']}, this.allowedAttributes);
        allowedPageAttributes.img = ['data-media-id'];
        allowedPageAttributes.audio = ['data-media-id'];

        if (this.config.read('scriptTagsAllowed') === true) {
            allowedPageTags = allowedPageTags.concat(['script']);
            allowedPageAttributes.script = ['type'];
        }

        return sanitizeHtml(
            body,
            {
                allowedTags: allowedPageTags,
                allowedAttributes: allowedPageAttributes,
                allowedIframeHostnames: ['www.youtube.com']
            }
        );
    }

    public sanitiseStoryDescription(description: string): string {
        if (description === undefined) {
            return;
        }

        return sanitizeHtml(
            description,
            {
                allowedTags: this.allowedTags,
                allowedAttributes: this.allowedAttributes,
            });
    }

    public sanitiseCollectionDescription(description: string): string {
        if (description === undefined) {
            return;
        }

        return sanitizeHtml(
            description,
            {
                allowedTags: this.allowedTags,
                allowedAttributes: this.allowedAttributes,
            });
    }
}