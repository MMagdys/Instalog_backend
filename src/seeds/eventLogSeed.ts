import Action from "@pbb/models/action/Action";
import EventLog from "@pbb/models/event/Event";
import User from "@pbb/models/user/User";
import PostgresUtil from "@pbb/utils/PostgresUtil";
const sequelize = PostgresUtil.getSequelize();


const user_data = [
    { id: "user_3VG74289PUAm", name: "Muhammad 1", group: "instatus.com"},
    { id: "user_3VG74289PUAd", name: "Muhammad 2", group: "instatus.com"},
    { id: "user_3VG74289PUAg", name: "Muhammad 3", group: "instatus.com"},
]

const action_data = [
    { id: "evt_action_00001", object: "event_action", name: "user.Login success"},
    { id: "evt_action_00002", object: "event_action", name: "user.searched_activity_log_events"},
    { id: "evt_action_00003", object: "event_action", name: "user.invited_teammate"},
]

const event_data = [
    {id: "evt_00001", object: "event", target_id: 'user_3VG74289PUAd', actor_id: 'user_3VG74289PUAm', action_id: 'evt_action_00001', location: '1.1.1.1', description: 'user.Login success', x_request_id: 'req_0123'},
    {id: "evt_00002", object: "event", target_id: 'user_3VG74289PUAg', actor_id: 'user_3VG74289PUAd', action_id: 'evt_action_00002', location: '1.1.1.1', description: 'user.searched_activity_log_events', x_request_id: 'req_0123'},
    {id: "evt_00003", object: "event", target_id: 'user_3VG74289PUAm', actor_id: 'user_3VG74289PUAg', action_id: 'evt_action_00003', location: '1.1.1.1', description: 'user.invited_teammate', x_request_id: 'req_0123'},
]




export default class Seed {
    

    public static async run() {
        await this.createEventLogSeed();
    }


    private static async createEventLogSeed() {

        await sequelize.drop();

        sequelize.sync({ force: true }).then(() => {
            User.bulkCreate(user_data, { validate: true }).then((res: any) => {
                Action.bulkCreate(action_data, { validate: true }).then((res: any) => {
                    EventLog.bulkCreate(event_data, { validate: true }).then(() => {
                    console.log("Seed created!")
                    }).catch((error: any) => {
                        console.log(error);
                    });
                }).catch((error: any) => {
                    console.log(error);
                });
            }).catch((error: any) => {
                console.log(error);
            });
        }).catch((error: any) => {
            console.error('Unable to create table : ', error);
        });
    }
}



