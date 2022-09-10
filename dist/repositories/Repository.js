"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Repository_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let Repository = Repository_1 = class Repository {
    createPageInfo(count, skip, limit) {
        const currentPage = (skip / limit) + 1;
        const pagesCount = Math.ceil(count / limit);
        const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository_1.NO_NEXT_PAGE;
        return {
            currentPage,
            pagesCount,
            nextPage,
            perPage: limit,
            recordsCount: count
        };
    }
    getLimit(queryOptions) {
        return queryOptions.paginateParams.perPage;
    }
    getSkip(queryOptions) {
        return queryOptions.paginateParams.perPage * (queryOptions.paginateParams.page - 1);
    }
};
Repository.NO_NEXT_PAGE = -1;
Repository = Repository_1 = __decorate([
    (0, inversify_1.injectable)()
], Repository);
exports.default = Repository;
