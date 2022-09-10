"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventRepository_1 = __importDefault(require("@pbb/repositories/EventRepository"));
const UserRepository_1 = __importDefault(require("@pbb/repositories/UserRepository"));
const RepositoryTypes_1 = __importDefault(require("./RepositoryTypes"));
class RepositoryInversify {
    static register(container) {
        container.bind(RepositoryTypes_1.default.IEventRepository).to(EventRepository_1.default);
        container.bind(RepositoryTypes_1.default.IUserRepository).to(UserRepository_1.default);
    }
}
exports.default = RepositoryInversify;
