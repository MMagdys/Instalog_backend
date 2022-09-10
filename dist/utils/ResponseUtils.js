"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = __importDefault(require("@pbb/models/action/Action"));
const Event_1 = __importDefault(require("@pbb/models/event/Event"));
class ResponseUtils {
    static send(res, status, message, resourceName, data) {
        console.log(res.req.route.path);
        this.log(res.req, message, resourceName);
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
    static log(req, message, resourceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers['authorization'];
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            // @ts-ignore
            const requestId = req.rid;
            const eventId = requestId.split('/')[1].split('-')[0] + Number(requestId.split('/')[1].split('-')[1]);
            const action = yield Action_1.default.create({
                id: `evt_action_${eventId}`,
                object: "event_action",
                name: `${resourceName}: ${message}`
            });
            const userEvent = yield Event_1.default.create({
                id: `evt_${eventId}`,
                object: "event",
                actor_id: userId,
                // @ts-ignore
                action_id: action.id,
                location: ip,
                description: `${resourceName}: ${message}`,
                x_request_id: requestId
            });
            console.log("logger", userId, userEvent);
        });
    }
}
exports.default = ResponseUtils;
