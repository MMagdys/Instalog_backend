import PostgresUtil from "@pbb/utils/PostgresUtil";
const { DataTypes } = require("sequelize");
const sequelize = PostgresUtil.getSequelize();



const Action = sequelize.define("Action", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    object: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false
});



export default Action;