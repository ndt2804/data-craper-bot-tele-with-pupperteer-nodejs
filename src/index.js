const browserInstance = require("../brower");
const getProduct = require('../src/shoppe/getProduct')
//const TelegramBot = require('node-telegram-bot-api');

//require('dotenv').config();

//const token = process.env.token;
//const chat_id = process.env.chatId;


//const bot = new TelegramBot(token, {polling: true});

setInterval(async () => {
    let url = `https://shopee.vn/S%C3%A1ch-Tokyo-Revengers-6-(B%E1%BA%A3n-%C4%90%E1%BA%B7c-Bi%E1%BB%87t)-i.374899645.19459451317`;
    const browser = await browserInstance();
    const page = (await browser.pages())[0];
    console.log(`Navigating to ${url}...`);
   
    await page.goto(url);
    async function scrap() {
        var dataScrap = [];
        dataScrap.push(await getProduct(url, browser));  
        return dataScrap ;
    } 
    scrap();
   

    
}, 5000);