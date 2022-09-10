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
const User_1 = __importDefault(require("@pbb/models/user/User"));
const PostgresUtil_1 = __importDefault(require("@pbb/utils/PostgresUtil"));
const sequelize = PostgresUtil_1.default.getSequelize();
const user_data = [
    { id: "user_3VG74289PUAm", name: "Muhammad 1", group: "instatus.com" },
    { id: "user_3VG74289PUAd", name: "Muhammad 2", group: "instatus.com" },
    { id: "user_3VG74289PUAg", name: "Muhammad 3", group: "instatus.com" },
];
const action_data = [
    { id: "evt_action_00001", object: "event_action", name: "user.Login success" },
    { id: "evt_action_00002", object: "event_action", name: "user.searched_activity_log_events" },
    { id: "evt_action_00003", object: "event_action", name: "user.invited_teammate" },
];
const event_data = [
    { id: "evt_00001", object: "event", target_id: 'user_3VG74289PUAd', actor_id: 'user_3VG74289PUAm', action_id: 'evt_action_00001', location: '1.1.1.1', description: 'user.Login success', x_request_id: 'req_0123' },
    { id: "evt_00002", object: "event", target_id: 'user_3VG74289PUAg', actor_id: 'user_3VG74289PUAd', action_id: 'evt_action_00002', location: '1.1.1.1', description: 'user.searched_activity_log_events', x_request_id: 'req_0123' },
    { id: "evt_00003", object: "event", target_id: 'user_3VG74289PUAm', actor_id: 'user_3VG74289PUAg', action_id: 'evt_action_00003', location: '1.1.1.1', description: 'user.invited_teammate', x_request_id: 'req_0123' },
];
class Seed {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createEventLogSeed();
        });
    }
    static createEventLogSeed() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sequelize.drop();
            sequelize.sync({ force: true }).then(() => {
                User_1.default.bulkCreate(user_data, { validate: true }).then((res) => {
                    Action_1.default.bulkCreate(action_data, { validate: true }).then((res) => {
                        Event_1.default.bulkCreate(event_data, { validate: true }).then(() => {
                            console.log("Seed created!");
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.error('Unable to create table : ', error);
            });
        });
    }
}
exports.default = Seed;
