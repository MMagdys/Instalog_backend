import { Response, Request } from 'express';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '@pbb/container/types';
import BaseController from './BaseController';
import EventRepository from '@pbb/repositories/EventRepository';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import UserRepository from '@pbb/repositories/UserRepository';
import EventMapper from '@pbb/mappers/EventMapper';
import { EventAttributes } from '@pbb/models/event/IEvent';


@controller('/v1/events')
export default class EventController extends BaseController {

    private resourceName = "Events";
    
    constructor(
        @inject(TYPES.IEventRepository) private eventRepository: EventRepository,
        @inject(TYPES.IUserRepository) private userRepository: UserRepository,
        @inject(TYPES.IEventMapper) private eventMapper: EventMapper,
    ) {
        super();
    }


    @httpGet('/')
    public async index(@request() req: Request, @response() res: Response) {

        const paginateParams = this.paginateParams(req);
        const searchString = req.query.searchString? String(req.query.searchString).toLowerCase(): undefined

        const page = await this.eventRepository.paginate({
            paginateParams,
            filter: searchString
        })

        return ResponseUtils.send(res, 200, "listing_successfully", this.resourceName, {
            page
        });
    }


    @httpPost('/')
    public async create(@request() req: Request, @response() res: Response) {

        const userId = req.headers['authorization'];

        if(!userId) {
            return ResponseUtils.send(res, 422, "missing_userId_header", this.resourceName, {});
        }
        
        const user = await this.userRepository.findOrCreate(userId);


        return ResponseUtils.send(res, 200, "Event log record Created", this.resourceName, {
            
        });
    }


    @httpGet('/:id')
    public async getEventDetails(@request() req: Request, @response() res: Response) {

       

        const userId = req.headers['authorization'];
        const eventId = req.params.id as string;

        if(!userId) {
            return ResponseUtils.send(res, 422, "missing_userId_header", this.resourceName, {});
        }

        const retrievedEvent = await this.eventRepository.findById(eventId);
        if (!retrievedEvent) {
            return ResponseUtils.send(res, 422, "unkown_eventId", this.resourceName, {});
        }

        const mappedEvent = this.eventMapper.toDto(retrievedEvent as unknown as EventAttributes)

        return ResponseUtils.send(res, 200, "Event log record Created", this.resourceName, {
            record: mappedEvent
        });
    }

}
