const Discord = require("discord.js"); 
//const TOKEN = "MzQyNjYxNzI4MTc1MjU5NjQ5.DGS4Jg.EjbL-_QR1AnRDgosj4PBB5qPOLc"
const PREFIX = ">>"
var bot = new Discord.Client();

bot.on("ready", function(){
    console.log("Ready");
    bot.user.setGame("worshipping iown");
});

function autoannounce(){
    console.log("checked");
    var date = new Date();
    var channel = bot.channels.find("name","discussion");
    var day = date.getDay();
    var hours = date.getHours();
    var mins = date.getMinutes();
    if (day == 6 && hours == 11 && mins == 55)
        channel.send("iOwn is amazing -- automatic message.");
 }
    setInterval(autoannounce,60000);
        //does it wor

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ")

    switch (args[0].toLowerCase()) {
        case "waddup":
            message.channel.send("ay whassup my nigga im da bot")
            break;
        case "info":
            message.channel.send("ay waddup iown is my creator i worship him, also if you read his name you automatically become his personal property.")
            break;
        case "asseating":
            message.channel.send("if you wanna know how to eat ass you should contact godstatus");
            break;
        case "takeover":
            message.channel.send("I will do what iOwn wants to, iOwn wants me to take over PR! \n http://www.reactiongifs.com/wp-content/uploads/2013/09/evil-laugh.gif");
        case "rankup":
            console.log(args.length);
            let role = message.guild.roles.find("name", "Staff Assistant | Bitches");
            if (message.member.roles.has(role.id)) {

                var mentionlist = message.mentions.members;
                mentionlist.forEach(function (user) {
                    wait(500);
                    message.channel.send(user.user.username+ " , You have been ranked up! ");
                    user.addRole("202542658634252289");
                });
                
              

            }
            break;
            
        case "enter":
            message.channel.send("https://cdn.discordapp.com/attachments/187018991074541568/307967143079837698/Hitting_Enter_Meme.jpg");
            break;
            
        case "day":
         var today = new Date();
            message.channel.send(today.getHours() + "hours");
            if (today.getDay() == 6)
                message.channel.send("today is  saturday bro");
            else if (today.getDay() == 5) 
                message.channel.send("today is friday bro, wooooo");
            else if (today.getDay() == 4)
                message.channel.send("today is thursday mate");
            else if(today.getDay() == 3)
                message.channel.send("today is wednesday");
            else if (today.getDay() == 2)
                message.channel.send("today is tuesday amigo");
            else if (today.getDay() == 1) 
                message.channel.send("today is monday :(");
            else if (today.getDay() == 0)
                message.channel.send("today is sunday dude");
            break;
        default:
            message.channel.send("no such command bro")
    }
});

bot.login(process.env.BOT_TOKEN);
