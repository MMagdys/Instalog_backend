"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
require("reflect-metadata");
require("module-alias/register");
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const path_1 = __importDefault(require("path"));
require("./api/v1/controllers");
const config_1 = __importDefault(require("./config"));
const container_1 = __importDefault(require("./container"));
const PostgresUtil_1 = __importDefault(require("@pbb/utils/PostgresUtil"));
const ruid = require('express-ruid');
const cors = require('@pbb/middlewares/cors');
class App {
    constructor() {
        this.postgresUrl = config_1.default.postgresUrl;
        const server = new inversify_express_utils_1.InversifyExpressServer(container_1.default);
        server.setConfig((app) => {
            app.set('view engine', 'ejs');
            app.set('views', 'views');
            app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(ruid({ setInContext: true }));
            app.use(cors.corsWithOptions);
            this.postgresqlSetup();
        });
        this.app = server.build();
    }
    postgresqlSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PostgresUtil_1.default.postgresqlSetup();
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    // await Seed.run();
}))();
exports.default = new App().app;
