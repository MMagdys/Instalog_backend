import TYPES from '@pbb/container/types';
import { EventAttributes } from '@pbb/models/event/IEvent';
import { inject, injectable } from 'inversify';
import ActionMapper, { ActionDto } from './ActionMapper';
import UserMapper, { UserDto } from './UserMapper';



export interface MetaData {
    redirect: string;
    description: string;
    x_request_id: string;
}


export interface EventDto {
    id: string;
    object: string;
    actor: UserDto;
	action: ActionDto;
	target: UserDto;
	occurred_at: Date;
    metaData: MetaData;
    location: string;
}

export interface IEventMapper {
    toDto(record: EventAttributes): EventDto;

}



@injectable()
export default class EventMapper implements IEventMapper {

    constructor(
        @inject(TYPES.IUserMapper) private userMapper: UserMapper,
        @inject(TYPES.IActionMapper) private actionMapper: ActionMapper,
    ) {}

    public toDto(record: EventAttributes): EventDto {
        
        return {
            id: record.id,
            object: record.object,
            actor: this.userMapper.toDto(record.actor),
            action: this.actionMapper.toDto(record.action),
            target: this.userMapper.toDto(record.target),
            occurred_at: record.createdAt,
            location: record.location,
            metaData: this.toMetaDataDto(record)
        };
    }

    private toMetaDataDto(record: EventAttributes): MetaData {
        
        return {
            redirect: record.redirect,
            description: record.description,
            x_request_id: record.x_request_id,
        };
    }
}