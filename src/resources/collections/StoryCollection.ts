import {Story} from "../models/Story";
import {BaseCollection} from "./BaseCollection";

export class StoryCollection extends BaseCollection<Story> {

    protected fromJSON(item: any): Story {
        if (item instanceof Story) {
            return item as Story;
        }

        return new Story(item);
    }
}
