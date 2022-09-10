import RepositoryInversify from './repositories/RepositoryInversify';
import { Container } from 'inversify';


const container = new Container();

RepositoryInversify.register(container);

export default container;
