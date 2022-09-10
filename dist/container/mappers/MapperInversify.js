"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapperTypes_1 = __importDefault(require("./MapperTypes"));
const EventMapper_1 = __importDefault(require("@pbb/mappers/EventMapper"));
const UserMapper_1 = __importDefault(require("@pbb/mappers/UserMapper"));
const ActionMapper_1 = __importDefault(require("@pbb/mappers/ActionMapper"));
class RepositoryInversify {
    static register(container) {
        container.bind(MapperTypes_1.default.IEventMapper).to(EventMapper_1.default);
        container.bind(MapperTypes_1.default.IUserMapper).to(UserMapper_1.default);
        container.bind(MapperTypes_1.default.IActionMapper).to(ActionMapper_1.default);
    }
}
exports.default = RepositoryInversify;
