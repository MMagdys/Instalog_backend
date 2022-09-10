import TYPES from '@pbb/container/types';
import { injectable, inject } from 'inversify';
import { PaginateParams } from '@pbb/api/v1/controllers/BaseController';
import Repository, { IQueryOptions, Page } from './Repository';
import Action from '@pbb/models/action/Action';
import EventLog from '@pbb/models/event/Event';
import User from '@pbb/models/user/User';
const sequelize = require('sequelize');



export interface IEventRepository { }


@injectable()
export default class EventRepository extends Repository {

    constructor() {
       super()
    }

    private NO_NEXT_PAGE = -1;



    public async findById(id: string) {

        const record = await EventLog.findOne({
            where: {
                id
            },
            include: [
                {
                    model: User,
                    as: 'actor',
                    attributes:['id', 'name', 'group'],
                },
                {
                    model: User,
                    as: 'target',
                    attributes:['id', 'name', 'group'],
                },
                {
                    model: Action,
                    as: 'action',
                    attributes:['id', 'object', 'name']
                },
            ]
        })

        return record;
    
    }


    public async findMany(filter:any) {

        EventLog.findAll({
            include: [ 'actor_id' ] 
        })
        .then((res: any) => {
            return res;
        })
        .catch((err: any) => {
            console.log(err);
            return;
        })

        const records = await  EventLog.findAll({});

        return records;
    }


    public async paginate(queryOptions: IQueryOptions): Promise<Page<any>> {

        const filter = queryOptions.filter ? queryOptions.filter : '';
        const limit = this.getLimit(queryOptions);
        const skip = this.getSkip(queryOptions);

        let finalList: any[] = [];
        let matchIds: Set<String> = new Set<String>();
        let records: any[] = [];

        const matchByActorList = await this.findByActorName(filter);
        const matchByActioList = await this.findByActionName(filter);


        for (let i = 0; i < matchByActorList.length; i++) {

            const record = matchByActorList[i] as any;

            if(matchIds.has(record.id)){
                continue;
            }

            finalList.push(record);
            matchIds.add(record.id);            
        }

        for (let i = 0; i < matchByActioList.length; i++) {

            const record = matchByActioList[i] as any;

            if(matchIds.has(record.id)){
                continue;
            }

            finalList.push(record);
            matchIds.add(record.id);            
        }


        const count = finalList.length;

        const pageInfo = this.createPageInfo(count, skip, limit);
        const startIndex = (pageInfo.currentPage - 1) * pageInfo.perPage;
        let endIndex =  pageInfo.currentPage * pageInfo.perPage;
        if(endIndex > count) {
            endIndex = count
        }
        if(startIndex > count - 1) {
            records = []
        }
        else {
            records = finalList.slice(startIndex, endIndex)
        }

        return {
            records,
            pageInfo
        };

    }

    private async findByActorName(name: string) {

        const macthUsers = await User.findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name + '%')
            }
        })

        const macthUserIds = macthUsers.map((user: any) => user.id);

        const records = await EventLog.findAll({
            attributes:['id', ['createdAt', 'occurred_at']],
            include: [
                {
                    model: User,
                    as: 'actor',
                    attributes:['id', 'name'],
                    where: {
                        id: macthUserIds
                    },
                },
                {
                    model: Action,
                    as: 'action',
                    attributes:['id', 'name']
                },
            ]
        })

        return records;
    }


    private async findByActionName(name: string) {

        const macthUsers = await Action.findAll({
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name + '%')
            }
        })

        const macthUserIds = macthUsers.map((user: any) => user.id);

        const records = await EventLog.findAll({
            attributes:['id', ['createdAt', 'occurred_at']],
            include: [
                {
                    model: User,
                    as: 'actor',
                    attributes:['id', 'name'],
                },
                {
                    model: Action,
                    as: 'action',
                    attributes:['id', 'name'],
                    where: {
                        id: macthUserIds
                    },
                },
            ]
        })

        return records;
    }


}