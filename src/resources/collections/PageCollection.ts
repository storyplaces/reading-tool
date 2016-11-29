import {BaseCollection} from "./BaseCollection";
import {Page} from "../models/Page";

export class PageCollection extends BaseCollection<Page> {

    protected fromJSON(item: any): Page {
        if (item instanceof Page) {
            return item as Page;
        }

        return new Page(item);
    }
}