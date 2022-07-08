const TelegramApi=require('node-telegram-bot-api')
const options = require('./options')
const {gameOptions, againOptions}=require('./options')
const token='5269084953:AAEVUTI84IAQlR_stvuKCjcGTYioal94ef8'

const bot =new TelegramApi(token,{polling: true})


const chats={}

const startGame=async(chatId)=>{
    await bot.sendMessage(chatId,'i zagadal cifru ot 0 do 9')
    const randomnum=Math.floor(Math.random()*10)
    chats[chatId] =randomnum;
    await bot.sendMessage(chatId,'otgadivay', gameOptions)

}
 
const start=()=>{
    bot.setMyCommands([
        {command:'/start', description:'Приветствие'},
        {command:'/info', description:'informationn'},
        {command:'/game', description:'igra'},
    
    ])
    
    bot.on('message',async msg=>{
        const text=msg.text;
        const chatId=msg.chat.id;
    
        //console.log(msg)
    if(text=='/start'){
        await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/637/424/63742453-44b3-30a5-8a97-5ee086adda78/2.webp')
        return bot.sendMessage(chatId,`ты написал мне ghbdtn`)
    
    }
    if(text==='/info'){
        return bot.sendMessage(chatId,`your name ${msg.from.first_name} ${msg.from.last_name}`)
    
    }
    if(text==='/game'){
        return startGame(chatId)
       }
    
    return bot.sendMessage(chatId,'i tebi ne ponimay')


    })  

    bot.on('callback_query',async msg=>{
        const data=msg.data;
        const chatId=msg.message.chat.id;
        if(data==='/again'){
            return startGame(chatId)

        }
        if(data===chats[chatId]){
            bot.sendMessage(chatId ,`ti ugadal ${chats[chatId]}`,againOptions)
        }
        else bot.sendMessage(chatId ,`ti ne ygadal,bot xagadal${chats[chatId]}`,againOptions)
       // bot.sendMessage(chatId ,`ti vibral cifru ${data}`)
    })
}

start();