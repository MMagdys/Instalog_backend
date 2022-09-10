"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@pbb/models/user/User"));
const Action_1 = __importDefault(require("@pbb/models/action/Action"));
const PostgresUtil_1 = __importDefault(require("@pbb/utils/PostgresUtil"));
const { DataTypes } = require("sequelize");
const sequelize = PostgresUtil_1.default.getSequelize();
const EventLog = sequelize.define('EventLog', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    object: {
        type: DataTypes.STRING,
    },
    actor_id: {
        type: DataTypes.STRING,
        references: {
            model: User_1.default,
            key: 'id',
        }
    },
    target_id: {
        type: DataTypes.STRING,
        references: {
            model: User_1.default,
            key: 'id',
        }
    },
    action_id: {
        type: DataTypes.STRING,
        references: {
            model: Action_1.default,
            key: 'id',
        }
    },
    location: {
        type: DataTypes.STRING,
    },
    redirect: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    x_request_id: {
        type: DataTypes.STRING,
    },
});
EventLog.belongsTo(Action_1.default, { as: 'action', foreignKey: 'action_id' });
EventLog.belongsTo(User_1.default, { as: 'actor', foreignKey: 'actor_id' });
EventLog.belongsTo(User_1.default, { as: 'target', foreignKey: 'target_id' });
// (async () => {
// 	await sequelize.sync({ force: true });
// 	// Code here
//   })();
exports.default = EventLog;
