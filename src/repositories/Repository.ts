import { injectable } from 'inversify';
import { PaginateParams } from '@pbb/api/v1/controllers/BaseController';


export interface IQueryOptions {
    filter?: any;
    limit?: number;
    skip?: number;
    paginateParams: PaginateParams;
}


export interface PageInfo {
    currentPage: number;
    pagesCount: number;
    nextPage: number;
    recordsCount: number;
    perPage: number;
}

export interface Page<T> {
    records: T [];
    pageInfo: PageInfo;
}


export interface IRepository {

}


@injectable()
export default abstract class Repository {

    private static NO_NEXT_PAGE = -1;


    protected createPageInfo(count: number, skip: number, limit: number): PageInfo {

        const currentPage = (skip / limit) + 1;
        const pagesCount = Math.ceil(count / limit);
        const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository.NO_NEXT_PAGE;

        return {
            currentPage,
            pagesCount,
            nextPage,
            perPage: limit,
            recordsCount: count
        }
    }


    protected getLimit(queryOptions: IQueryOptions): number {
        return queryOptions.paginateParams.perPage;
    }


    protected getSkip(queryOptions: IQueryOptions): number {
        return queryOptions.paginateParams.perPage * (queryOptions.paginateParams.page - 1);
    }


}
