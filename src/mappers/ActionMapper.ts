import { ActionAttributes } from '@pbb/models/action/IAction';
import { injectable } from 'inversify';


export interface ActionDto {
    id: string;
    object: string;
    name: string;
}


export interface IActionMapper {
    toDto(record: ActionAttributes): ActionDto;

}


@injectable()
export default class ActionMapper implements IActionMapper {

    constructor() {}

    public toDto(record: ActionAttributes): ActionDto {
        
        return {
            id: record.id,
            object: record.object,
            name: record.name,
        };
    }
}