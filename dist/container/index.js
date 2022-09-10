"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryInversify_1 = __importDefault(require("./repositories/RepositoryInversify"));
const inversify_1 = require("inversify");
const container = new inversify_1.Container();
RepositoryInversify_1.default.register(container);
exports.default = container;
