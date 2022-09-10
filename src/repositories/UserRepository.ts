import { PaginateParams } from '@pbb/api/v1/controllers/BaseController';
import TYPES from '@pbb/container/types';
import Action from '@pbb/models/action/Action';
import EventLog from '@pbb/models/event/Event';
import User from '@pbb/models/user/User';
import { injectable, inject } from 'inversify';
import Repository from './Repository';


export interface IUserRepository { }


@injectable()
export default class UserRepository extends Repository {

    constructor() {
       super()
    }

    public async findOrCreate(id: string): Promise<any> {

        const [user, created] = await User.findOrCreate({
            where: { id },
            defaults: {
                name: "Muhammad Magdy",
                group: "instatus.com"
            }
        });

        return user;
    }


    

}