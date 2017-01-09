import {bindable} from "aurelia-framework";
import {Page} from "../../resources/models/Page";
/**
 * Created by andy on 28/11/16.
 */

export class PagesListElement {

    constructor() {

    }

    @bindable readingId: string;

    @bindable pages: Array<Page> = [];




}