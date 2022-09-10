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
const inversify_1 = require("inversify");
const Repository_1 = __importDefault(require("./Repository"));
const Action_1 = __importDefault(require("@pbb/models/action/Action"));
const Event_1 = __importDefault(require("@pbb/models/event/Event"));
const User_1 = __importDefault(require("@pbb/models/user/User"));
const sequelize = require('sequelize');
let EventRepository = class EventRepository extends Repository_1.default {
    constructor() {
        super();
        this.NO_NEXT_PAGE = -1;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Event_1.default.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: User_1.default,
                        as: 'actor',
                        attributes: ['id', 'name', 'group'],
                    },
                    {
                        model: User_1.default,
                        as: 'target',
                        attributes: ['id', 'name', 'group'],
                    },
                    {
                        model: Action_1.default,
                        as: 'action',
                        attributes: ['id', 'object', 'name']
                    },
                ]
            });
            return record;
        });
    }
    findMany(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            Event_1.default.findAll({
                include: ['actor_id']
            })
                .then((res) => {
                return res;
            })
                .catch((err) => {
                console.log(err);
                return;
            });
            const records = yield Event_1.default.findAll({});
            return records;
        });
    }
    paginate(queryOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = queryOptions.filter ? queryOptions.filter : '';
            const limit = this.getLimit(queryOptions);
            const skip = this.getSkip(queryOptions);
            let finalList = [];
            let matchIds = new Set();
            let records = [];
            const matchByActorList = yield this.findByActorName(filter);
            const matchByActioList = yield this.findByActionName(filter);
            for (let i = 0; i < matchByActorList.length; i++) {
                const record = matchByActorList[i];
                if (matchIds.has(record.id)) {
                    continue;
                }
                finalList.push(record);
                matchIds.add(record.id);
            }
            for (let i = 0; i < matchByActioList.length; i++) {
                const record = matchByActioList[i];
                if (matchIds.has(record.id)) {
                    continue;
                }
                finalList.push(record);
                matchIds.add(record.id);
            }
            const count = finalList.length;
            const pageInfo = this.createPageInfo(count, skip, limit);
            const startIndex = (pageInfo.currentPage - 1) * pageInfo.perPage;
            let endIndex = pageInfo.currentPage * pageInfo.perPage;
            if (endIndex > count) {
                endIndex = count;
            }
            if (startIndex > count - 1) {
                records = [];
            }
            else {
                records = finalList.slice(startIndex, endIndex);
            }
            return {
                records,
                pageInfo
            };
        });
    }
    findByActorName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const macthUsers = yield User_1.default.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name + '%')
                }
            });
            const macthUserIds = macthUsers.map((user) => user.id);
            const records = yield Event_1.default.findAll({
                attributes: ['id', ['createdAt', 'occurred_at']],
                include: [
                    {
                        model: User_1.default,
                        as: 'actor',
                        attributes: ['id', 'name'],
                        where: {
                            id: macthUserIds
                        },
                    },
                    {
                        model: Action_1.default,
                        as: 'action',
                        attributes: ['id', 'name']
                    },
                ]
            });
            return records;
        });
    }
    findByActionName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const macthUsers = yield Action_1.default.findAll({
                where: {
                    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name + '%')
                }
            });
            const macthUserIds = macthUsers.map((user) => user.id);
            const records = yield Event_1.default.findAll({
                attributes: ['id', ['createdAt', 'occurred_at']],
                include: [
                    {
                        model: User_1.default,
                        as: 'actor',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Action_1.default,
                        as: 'action',
                        attributes: ['id', 'name'],
                        where: {
                            id: macthUserIds
                        },
                    },
                ]
            });
            return records;
        });
    }
};
EventRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], EventRepository);
exports.default = EventRepository;
