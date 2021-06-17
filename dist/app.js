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
Object.defineProperty(exports, "__esModule", { value: true });
const site_1 = __importDefault(require("./controllers/site"));
const site = new site_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (process.argv[2] && process.argv[3]) {
        switch (process.argv[2]) {
            case 'top':
                yield site.getTop(Number(process.argv[3]));
                break;
            case 'country':
                yield site.getTop(20, process.argv[3]);
                break;
            default:
                console.log('unknow command.');
        }
    }
}))();
//# sourceMappingURL=app.js.map