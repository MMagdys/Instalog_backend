import { Response, Request } from 'express';
import { controller, interfaces } from 'inversify-express-utils';



export interface PaginateParams {
    page: number;
    perPage: number;
}


@controller('')
export default abstract class BaseController implements interfaces.Controller {

    protected static DEFAULT_PAGE = 1;
    protected static DEFAULT_PER_PAGE = 5;

    constructor() {}


    protected paginateParams(request: Request): PaginateParams {

        const page = request.query.page ? + request.query.page : BaseController.DEFAULT_PAGE;
        const perPage = request.query.perPage ? + request.query.perPage : BaseController.DEFAULT_PER_PAGE;

        return { page, perPage };
    }

}
