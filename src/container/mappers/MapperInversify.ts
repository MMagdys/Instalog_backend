import { Container } from 'inversify';
import TYPES from './MapperTypes';
import EventMapper, { IEventMapper } from '@pbb/mappers/EventMapper';
import UserMapper, { IUserMapper } from '@pbb/mappers/UserMapper';
import ActionMapper, { IActionMapper } from '@pbb/mappers/ActionMapper';


export default class RepositoryInversify {
    public static register(container: Container) {
        container.bind<IEventMapper>(TYPES.IEventMapper).to(EventMapper);
        container.bind<IUserMapper>(TYPES.IUserMapper).to(UserMapper);
        container.bind<IActionMapper>(TYPES.IActionMapper).to(ActionMapper);
		
    }
}