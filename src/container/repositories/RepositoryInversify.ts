import EventRepository, { IEventRepository } from '@pbb/repositories/EventRepository';
import UserRepository, { IUserRepository } from '@pbb/repositories/UserRepository';
import { Container } from 'inversify';
import TYPES from './RepositoryTypes';



export default class RepositoryInversify {
  public static register(container: Container) {
    container.bind<IEventRepository>(TYPES.IEventRepository).to(EventRepository);
    container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
  }
}