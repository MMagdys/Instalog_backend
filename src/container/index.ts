import RepositoryInversify from './repositories/RepositoryInversify';
import { Container } from 'inversify';
import MapperInversify from './mappers/MapperInversify';


const container = new Container();

RepositoryInversify.register(container);
MapperInversify.register(container);


export default container;
