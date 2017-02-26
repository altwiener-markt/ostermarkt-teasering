import { NextFunction, Request, Response, Router } from 'express';
import { Route } from '../route';

import { Storyblok } from '../models/Storyblok';
import { IStoryblokTokens, IStoryArray, IStorySingle } from '../interfaces/IStoryblok';

/**
 * [ / ] -> route
 *
 * @export
 * @class IndexRoute
 * @extends {Route}
 */
export class IndexRoute extends Route {

    private storyblok: Storyblok;

    /**
     * Creates an instance of IndexRoute.
     *
     * @memberOf IndexRoute
     */
    constructor() {
        super();

        this.storyblok = new Storyblok({ public: '' } as IStoryblokTokens)

    }

    /**
     * Creates the route
     *
     * @static
     * @param {Router} router
     *
     * @memberOf IndexRoute
     */
    public static create(router: Router) {

        console.info('[IndexRoute::create] Creating index route.');

        // add home page route
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }

    /**
     * The home route
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     *
     * @memberOf IndexRoute
     */
    public index(req: Request, res: Response, next: NextFunction) {
        // set custom title
        this.title = 'Home';

        // set options
        // Storyblok data should be passed there
        let options: Object = {

        };

        this.storyblok.getStory('de/home', 'published')
            .then((response: IStorySingle) => {
                const _templ = `components/${response.story.content.component}.njk`;
                this.render(req, res, _templ, response.story);
            })

        // render the index Template
        // this.render(req, res, 'index.njk', options);
    }
}
