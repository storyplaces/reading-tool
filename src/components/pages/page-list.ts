import {bindable, containerless} from "aurelia-framework";
import {Page} from "../../resources/models/Page";
/**
 * Created by andy on 28/11/16.
 */

export class PageListCustomElement {

    constructor() {

    }

    @bindable readingId: string;

    @bindable pages: Array<Page>;




}