const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const token = process.env.token;
const chat_id = process.env.chatId;


const bot = new TelegramBot(token, {polling: true});
let promises = (f,browser) =>
  new Promise(async (resolve, reject) => {
    var newPage = await browser.newPage();
    await newPage.goto(f);
    await newPage.waitForSelector(
      "div.flex.items-center._283ldj > div.flex.items-center"
    );
    await newPage.waitForSelector(
      "div > div:nth-child(3) > div.flex.flex-column > div"
    );
    await newPage.waitForSelector(
      "div > div.flex.VrhRS0._1RCFQu > div > div:nth-child(1) > div"
    );
    await newPage.waitForSelector(
      "div.flex.items-center._283ldj > div.flex.items-center > div:nth-child(2)"
    );
    var dataObj = {};
    dataObj["name"] = await newPage.$eval("div._2rQP1z > span", (item) => {
      return item.textContent;
    });
    dataObj["price"] = await newPage.$eval(
      "div.flex.flex-auto.eTjGTe > div > div:nth-child(3) > div.flex.flex-column > div > div > div",
      (item) => {
        return item.querySelector("._2Shl1j").textContent
          ? item.querySelector("._2Shl1j").textContent
          : item.querySelector("._2yjfFH").textContent;
      }
    );
      // get 1 sản phẩm
    dataObj["product"] = await newPage.$eval(
      "div.flex.items-center._283ldj > div.flex.items-center > div:nth-child(2)",
      (item) => item.textContent
    );

    // get nhiều button item trong sản phẩm

    /*
    var button = {};
    button["status"] = await newPage.$$eval(
      "div.flex.VrhRS0._1RCFQu > div > div:nth-child(1) > div > button",
      (items) => {
        var list = [];
        for (const index in items) {
          if (items[index].getAttribute("aria-disabled") === "false")
            list.push(index);
        }
        return list;
      }
    );
    // console.log(button.status);
    var btn = await newPage.$$(
      "div.flex.VrhRS0._1RCFQu > div > div:nth-child(1) > div > button"
    );
    dataObj["status"] = [];
    for (let i = 0; i < button.status.length; i++) {
      var objStatus = [];
      var index = Number(button.status[i]) + 1;
      objStatus["category"] = await newPage.$eval(
        `div.flex.VrhRS0._1RCFQu > div > div:nth-child(1) > div > button:nth-child(${index})`,
        (item) => {
          return item?.textContent;
        }
      );
      await btn[button.status[i]].click();
      await newPage.waitForSelector(
        "div.flex.items-center._283ldj > div.flex.items-center > div:nth-child(2)"
      );
      objStatus["quantity"] = await newPage.$eval(
        "div.flex.items-center._283ldj > div.flex.items-center > div:nth-child(2)",
        (item) => item.textContent
      );

   
      // console.log(objStatus)
      dataObj["status"].push(objStatus);
    }
     */

    await newPage.close();
    console.log(dataObj);
    var getName = dataObj.name;
    var getStatus = dataObj.product;
    var getNotification = [];
    getNotification = getName + '    ' + getStatus;
    console.log(getNotification);
    bot.sendMessage(chat_id, getNotification);
    resolve(dataObj);

  });

module.exports = promises