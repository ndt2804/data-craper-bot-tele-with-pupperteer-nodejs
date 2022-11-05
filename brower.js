const puppeteer = require('puppeteer')

const startBrowser = async () =>{
    let browser ;
    try {
       // console.log('opening browser ...')
        browser = await puppeteer.launch({
            headless : true,
            ignoreHTTPSErrors : true,
        });
    } catch (error) {
        console.log('can not start browser')
        console.error(error)
    }
    return browser;
}

module.exports = startBrowser