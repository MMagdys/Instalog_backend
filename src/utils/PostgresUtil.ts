import config from "@pbb/config";
const {Sequelize} = require("sequelize");
import { Sequelize as tSequelize } from "sequelize/types";



export default class PostgresUtil {

    private static pool: any;
    
    private static postgresUrl = config.postgresUrl;
    private static sequelize: tSequelize = new Sequelize(this.postgresUrl);

    public static async postgresqlSetup(): Promise<void> {

        this.sequelize = new Sequelize(this.postgresUrl);
        console.log(this.postgresUrl)
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    
    public static getSequelize() {
        return this.sequelize;
    }


    public static async sync() {
        await this.sequelize.sync({ force: true });
    }

}