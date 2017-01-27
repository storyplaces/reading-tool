import {StoryPlacesAPI} from "../store/StoryplacesAPI";
import {inject, NewInstance} from "aurelia-framework";
import {TypeChecker} from "../utilities/TypeChecker";

/*******************************************************************
 *
 * StoryPlaces
 *
 This application was developed as part of the Leverhulme Trust funded
 StoryPlaces Project. For more information, please visit storyplaces.soton.ac.uk
 Copyright (c) 2017
 University of Southampton
 Charlie Hargood, cah07r.ecs.soton.ac.uk
 Kevin Puplett, k.e.puplett.soton.ac.uk
 David Pepper, d.pepper.soton.ac.uk

 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * The name of the University of Southampton nor the name of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE ABOVE COPYRIGHT HOLDERS BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

@inject(NewInstance.of(StoryPlacesAPI), TypeChecker)

export class Authenticator {

    private _userId: string = undefined;
    private userIdStorageString = "userId";

    constructor(private storyplacesAPI: StoryPlacesAPI, private typeChecker: TypeChecker) {
        this.storyplacesAPI.path = '/user/';
    }

    get userId(): string {
        return this._userId;
    }

    get loggedIn(): boolean {
        return this._userId !== undefined
    }

    login(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._userId = localStorage.getItem(this.userIdStorageString);

            if (this._userId) {
                resolve(true);
                return;
            }

            this.doBasicLogin().then(
                result => {
                    resolve(result)
                },
                error => {
                    reject(error)
                }
            );
        });
    }

    private doBasicLogin(): Promise<boolean> {
        return this.storyplacesAPI
            .save({id: undefined})
            .then(res => res.json() as any)
            .then(user => {
                this.typeChecker.validateAsStringOrUndefined("UserId", user.id);
                this._userId = user.id;

                localStorage.setItem(this.userIdStorageString, user.id);
                return true;
            });
    }

    logout() {
        localStorage.removeItem(this.userIdStorageString);
        this._userId = undefined;
    }
}