"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostgresUtil_1 = __importDefault(require("@pbb/utils/PostgresUtil"));
const { DataTypes } = require("sequelize");
const sequelize = PostgresUtil_1.default.getSequelize();
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
exports.default = Action;
