import Site from './controllers/site';
const site = new Site();

(async () =>{
    if(process.argv[2] && process.argv[3]){
        switch(process.argv[2]){
            case 'top':
                await site.getTop(Number(process.argv[3]))
                break;
            case 'country':
                await site.getTop(20, process.argv[3])
                break;
            default:
                console.log('unknow command.')
        }
    }
})()
