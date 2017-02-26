import * as url from 'url';
import * as request from 'request';

import { IStoryblokTokens } from '../interfaces/IStoryblok';

export class Storyblok {

    static API_ENDPOINT: string = 'https://api.storyblok.com/';
    static STORIES_ENDPOINT: string = 'v1/cdn/stories/'

    static get MODE_DRAFT(): string {
        return 'draft';
    }

    static get MODE_PUBLISHED(): string {
        return 'published';
    }

    protected publicToken: string;
    protected privateToken: string;

    constructor(tokens: IStoryblokTokens) {
        this.publicToken = tokens.public;
        this.privateToken = tokens.private;
    }

    public getStory(slug: string, version: string): Promise<any> {

        if(!version) {
            version = Storyblok.MODE_PUBLISHED;
        }

        let _url = url.parse(`${Storyblok.API_ENDPOINT}${Storyblok.STORIES_ENDPOINT}${slug}`, true);
        _url.query.version = 'public';
        _url.query.token = this.getToken(version);

        return this.apiRequest(_url);
    }

    private getToken(version: string) {
        switch(version) {
            case Storyblok.MODE_PUBLISHED:
                return this.publicToken;
            case Storyblok.MODE_DRAFT:
                return this.privateToken;
        }
    }

    public apiRequest(requestUrl: url.Url): Promise<any> {
        const _url: string = url.format(requestUrl);

        return new Promise((resolve, reject) => {
            request.get(_url, (error: any, response: request.RequestResponse, body: any) => {

                if(error) {
                    reject(error);
                } else {
                    const story = JSON.parse(body);
                    resolve(story);
                }
            });
        });
    }
}
