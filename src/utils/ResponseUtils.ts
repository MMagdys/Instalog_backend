import Action from '@pbb/models/action/Action';
import EventLog from '@pbb/models/event/Event';
import { Response, Request } from 'express';

export default class ResponseUtils {

    public static send(res: Response, status: number, message: string, resourceName: string, data?: object) {
        
        console.log(res.req.route.path)
        this.log(res.req as Request, message, resourceName);
        const splittedMessage = message.split(', ');
        return res.format({
            json: () => {
                res.status(status).json({
                    meta: {
                        status,
                        message: message
                    },
                    data,
                });
            },
            default: () => {
                res.status(406).send();
            }
        });
    }


    public static async log(req: Request, message: string, resourceName: string) {
        
        const userId = req.headers['authorization'];
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        // @ts-ignore
        const requestId = req.rid!;
        const eventId = requestId.split('/')[1].split('-')[0] + Number(requestId.split('/')[1].split('-')[1]);

        const action = await Action.create({
            id: `evt_action_${eventId}`,
            object: "event_action",
            name: `${resourceName}: ${message}`
        })

        const userEvent = await EventLog.create({
            id: `evt_${eventId}`,
            object: "event",
            actor_id: userId,
            // @ts-ignore
            action_id: action.id,
            location: ip,
            description: `${resourceName}: ${message}`,
            x_request_id: requestId
        })


        console.log("logger", userId, userEvent)
    }
    
}
