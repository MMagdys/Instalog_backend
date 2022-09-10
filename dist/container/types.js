"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapperTypes_1 = __importDefault(require("./mappers/MapperTypes"));
const RepositoryTypes_1 = __importDefault(require("./repositories/RepositoryTypes"));
const TYPES = Object.assign(Object.assign({}, RepositoryTypes_1.default), MapperTypes_1.default);
exports.default = TYPES;
