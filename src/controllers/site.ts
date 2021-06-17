import axios, {AxiosRequestConfig} from 'axios';
import cheerio from 'cheerio';
import config from '../config/config';
const areas = config.areas;

export default class Site{
    constructor(){

    }
    async getTop(count: number, country?: string): Promise<void>{
        let sites = [];
        const config: AxiosRequestConfig = {
            method: 'get',
            url: country?`https://www.alexa.com/topsites/countries/${areas[country]}`:'https://www.alexa.com/topsites'
        }
        let res = await axios(config)
        if(res.status == 200){
            const $ = cheerio.load(res.data)
            $('div[class="tr site-listing"]').each((i, elem) =>{
                if(i > count-1) return false
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
                })
            })
        }
        else{
            console.error(res.status)
        }
        console.log(sites)    
    }
}
