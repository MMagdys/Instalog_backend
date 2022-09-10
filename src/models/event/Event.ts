import User from "@pbb/models/user/User";
import Action from "@pbb/models/action/Action";
import PostgresUtil from "@pbb/utils/PostgresUtil";
const { DataTypes } = require("sequelize");
const sequelize = PostgresUtil.getSequelize();



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
			model: User,
			key: 'id',    
	  	}
  	},
  	target_id: {
		type: DataTypes.STRING,
		references: {
			model: User,
			key: 'id',    
	  	}
  	},
	action_id: {
		type: DataTypes.STRING,
		references: {
			model: Action,
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



EventLog.belongsTo(Action, { as:'action', foreignKey: 'action_id'});
EventLog.belongsTo(User, { as:'actor', foreignKey: 'actor_id'});
EventLog.belongsTo(User, { as:'target', foreignKey: 'target_id'});


// (async () => {
// 	await sequelize.sync({ force: true });
// 	// Code here
//   })();


export default EventLog;
