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
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const config_1 = __importDefault(require("../config/config"));
const areas = config_1.default.areas;
class Site {
    constructor() {
    }
    getTop(count, country) {
        return __awaiter(this, void 0, void 0, function* () {
            let sites = [];
            const config = {
                method: 'get',
                url: country ? `https://www.alexa.com/topsites/countries/${areas[country]}` : 'https://www.alexa.com/topsites'
            };
            let res = yield axios_1.default(config);
            if (res.status == 200) {
                const $ = cheerio_1.default.load(res.data);
                $('div[class="tr site-listing"]').each((i, elem) => {
                    if (i > count - 1)
                        return false;
                    sites.push({
                        name: $(elem)
                            .find('div[class="td DescriptionCell"]')
                            .text()
                            .trim(),
                        dailyTimeOnSite: $(elem)
                            .children('div[class="td right"]')
                            .eq(0)
                            .text(),
                        DailyPageviewsPerVisitor: $(elem)
                            .children('div[class="td right"]')
                            .eq(1)
                            .text(),
                        trafficFromSearch: $(elem)
                            .children('div[class="td right"]')
                            .eq(2)
                            .text(),
                        totalSitesLinkingIn: $(elem)
                            .children('div[class="td right"]')
                            .eq(3)
                            .text(),
                    });
                });
            }
            else {
                console.error(res.status);
            }
            console.log(sites);
        });
    }
}
exports.default = Site;
//# sourceMappingURL=site.js.map