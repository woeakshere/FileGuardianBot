

const { Button } = require("telegram/tl/custom/button");
const logger = require("../../logger");
const getLang = require("../i18n/utils");
const translate = require("../i18n/t9n");
const { buttons } = require("telegram/client");


module.exports = function(client){
    client.addEventHandler((update) => {
        if (update && update.message && update.message.message && 
                        update.message.message.startsWith("/start")){
            
            logger.log('info', `${__dirname} : ${update.message.message.chatId}`)
            try {
                lang_code = getLang(update.message.chatId);
                text, button = translate ({
                    text: "[start][message]",
                    button: "[start][button][withChannel]",
                    langCode: lang_code
                });
                client.sendMessage(update.message.chatId, {
                    message: text,
                    buttons: client.buildReplyMarkup(buttons),
                });
                return 0;
            } catch (error) {
                logger.log('error', `${__dirname} : ${error}`)
                this.function(client);
            }
        }
    });
}