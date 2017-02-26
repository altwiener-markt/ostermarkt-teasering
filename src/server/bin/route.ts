import { NextFunction, Request, Response } from 'express';

export class Route {

    protected title: string;

    private scripts: string[];

    constructor() {
        this.title = 'BaseRoute'
        this.scripts = [];
    }

    public addScript(src: string): Route {
        this.scripts.push(src);
        return this;
    }

    public render(req: Request, res: Response, view: string, options?: Object) {
        // add constants
        res.locals.BASE_URL = '/';

        // add scripts
        res.locals.scripts = this.scripts;

        // add title
        res.locals.title = this.title;

        // render view
        res.render(view, options);
    }
}
