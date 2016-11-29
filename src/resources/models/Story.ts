import {Identifiable} from "../interfaces/Identifiable";
import {PageCollection} from "../collections/PageCollection";

export class Story implements Identifiable {
    id: string;
    name: string;
    deck: PageCollection;
    cachedMediaIds;
    conditions;
    deckViewMode;
    functions;
    tags;
    description;
    author;

    constructor({id = '', name = '', deck = new PageCollection(), cachedMediaIds = [], conditions = [], deckViewMode = [], functions = [], tags = [], author = '', description = ''} = {}) {
        this.id = id;
        this.cachedMediaIds = cachedMediaIds ;
        this.conditions = conditions;
        this.deckViewMode = deckViewMode;
        this.functions = functions;
        this.tags = tags;
        this.author = author;
        this.description = description;
        this.name = name;
        this.deck = deck instanceof PageCollection ? deck : new PageCollection(deck);
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            deck: this.deck
        }
    }
}