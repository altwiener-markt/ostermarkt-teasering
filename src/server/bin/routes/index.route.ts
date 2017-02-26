import { NextFunction, Request, Response, Router } from 'express';
import { Route } from '../route';

/**
 * [ / ] -> route
 *
 * @export
 * @class IndexRoute
 * @extends {Route}
 */
export class IndexRoute extends Route {

    /**
     * Creates an instance of IndexRoute.
     *
     * @memberOf IndexRoute
     */
    constructor() {
        super();
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

        // render the index Template
        this.render(req, res, 'index.njk', options);
    }
}
