import { UserAttributes } from '@pbb/models/user/IUser';
import { injectable } from 'inversify';


export interface UserDto {
    id: string;
    name: string;
    group: string;
}


export interface IUserMapper {
    toDto(record: UserAttributes): UserDto;

}


@injectable()
export default class UserMapper implements IUserMapper {

    constructor() {}

    public toDto(record: UserAttributes): UserDto {
        
        return {
            id: record.id,
            name: record.name,
            group: record.group,
        };
    }
}