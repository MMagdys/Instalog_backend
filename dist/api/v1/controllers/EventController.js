"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("@pbb/container/types"));
const BaseController_1 = __importDefault(require("./BaseController"));
const EventRepository_1 = __importDefault(require("@pbb/repositories/EventRepository"));
const ResponseUtils_1 = __importDefault(require("@pbb/utils/ResponseUtils"));
const UserRepository_1 = __importDefault(require("@pbb/repositories/UserRepository"));
let EventController = class EventController extends BaseController_1.default {
    constructor(eventRepository, userRepository) {
        super();
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.resourceName = "Events";
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paginateParams = this.paginateParams(req);
            const searchString = req.query.searchString ? String(req.query.searchString).toLowerCase() : undefined;
            console.log("event list", paginateParams, searchString);
            const page = yield this.eventRepository.paginate({
                paginateParams,
                filter: searchString
            });
            return ResponseUtils_1.default.send(res, 200, "listing_successfully", this.resourceName, {
                page
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers['authorization'];
            if (!userId) {
                return ResponseUtils_1.default.send(res, 422, "missing_userId_header", this.resourceName, {});
            }
            const user = yield this.userRepository.findOrCreate(userId);
            return ResponseUtils_1.default.send(res, 200, "Event log record Created", this.resourceName, {});
        });
    }
    getEventDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers['authorization'];
            const eventId = req.params.id;
            if (!userId) {
                return ResponseUtils_1.default.send(res, 422, "missing_userId_header", this.resourceName, {});
            }
            const retrievedEvent = yield this.eventRepository.findById(eventId);
            if (!retrievedEvent) {
                return ResponseUtils_1.default.send(res, 422, "unkown_eventId", this.resourceName, {});
            }
            return ResponseUtils_1.default.send(res, 200, "Event log record Created", this.resourceName, {
                record: retrievedEvent
            });
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "index", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:id'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventDetails", null);
EventController = __decorate([
    (0, inversify_express_utils_1.controller)('/v1/events'),
    __param(0, (0, inversify_1.inject)(types_1.default.IEventRepository)),
    __param(1, (0, inversify_1.inject)(types_1.default.IUserRepository)),
    __metadata("design:paramtypes", [EventRepository_1.default,
        UserRepository_1.default])
], EventController);
exports.default = EventController;
