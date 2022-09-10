import PostgresUtil from "@pbb/utils/PostgresUtil";
const { DataTypes } = require("sequelize");
const sequelize = PostgresUtil.getSequelize();



const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: DataTypes.STRING,
    group: DataTypes.STRING,
}, {
  
});


// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

// User.hasMany(UserEvent);
// User.belongsToMany(UserEvent);


export default User;