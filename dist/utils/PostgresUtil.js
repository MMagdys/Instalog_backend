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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@pbb/config"));
const { Sequelize } = require("sequelize");
class PostgresUtil {
    static postgresqlSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new Sequelize(this.postgresUrl);
            console.log(this.postgresUrl);
            try {
                yield this.sequelize.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
    static getSequelize() {
        return this.sequelize;
    }
    static sync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.sync({ force: true });
        });
    }
}
exports.default = PostgresUtil;
_a = PostgresUtil;
PostgresUtil.postgresUrl = config_1.default.postgresUrl;
PostgresUtil.sequelize = new Sequelize(_a.postgresUrl, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
