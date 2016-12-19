import {AbstractConnector} from "./AbstractConnector";
import {inject, NewInstance} from 'aurelia-framework';
import {Reading} from "../models/Reading";
import {StoryPlacesAPI} from "./StoryplacesAPI";
import {ReadingCollection} from "../collections/ReadingCollection";
/**
 * Created by andy on 09/12/16.
 */

@inject(ReadingCollection, NewInstance.of(StoryPlacesAPI))
export class ReadingConnector extends AbstractConnector<Reading> {

    constructor(private readingCollection : ReadingCollection, private storyplacesAPI: StoryPlacesAPI){
        super();
        this.storyplacesAPI.path = "/reading/";
    }

    get all(): Array<Reading> {
        return this.readingCollection.all;
    }

    byId(id: string): Reading {
        return this.readingCollection.get(id);
    }

    fetchAll(): Promise<Array<Reading>> {
        return this.storyplacesAPI.getAll().then(readings => {
            return readings.json().then (readings => {
                this.readingCollection.saveMany(readings);
            });
        })
    }

    fetchById(id: string): Promise<Reading> {
        return this.storyplacesAPI.getOne(id).then(reading => {
            return reading.json().then (reading => {
                this.readingCollection.save(reading);
            });
        })
    }

    save(object: Reading): Promise<Reading> {
        return this.storyplacesAPI.save(object).then(reading => {
            return reading.json().then (reading => {
                this.readingCollection.save(reading);
            });
        });
    }

    remove(id: string): Promise<boolean> {
        return new Promise((success) => {
            return success(true);
        });
    }

    byStoryId(storyId: string): Array<Reading> {
        //TODO: Make this return based on storyId.
        return this.readingCollection.all;
        
    }
}