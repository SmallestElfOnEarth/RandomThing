const Discord = require("discord.js"); 
requestjson = require('request-json');
var arr = require('./clanmembers');
var arrog = require('./clanogs');
var client = requestjson.createClient('https://www.roblox.com/');
var clanfound = [];
var playerscore = [];
var playerfound = ""
var scorereq = 1000000

const PREFIX = ">>"
var bot = new Discord.Client();

bot.on("ready", function(){
    console.log("Ready");
    bot.user.setGame("with iown's genitalia.");
});

function autoannounce(){
    var date = new Date();
    var channel = bot.channels.find("name","announcements");
    var day = date.getDay();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var challenge = "!challenge";
    if (day == 3 || day == 5){
        console.log("day = true " + "Hour: " + hours + " Minutes: "+ mins);
        if( hours === 23 && mins == 1){
            console.log("Hour: " + hours +" Minutes: "+ mins);
        channel.send("**Weekly challenge submissions due every Sunday! Type " + challenge + " in ** <#235888338366758912> ** to see what this week's gun is.**");
 }}}
    setInterval(autoannounce,60000);

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
        break;
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
            message.channel.send(" \n\n\n**If you have not been ranked up, here's why:** \n**1.** You are not matching the minimum level requirement (20+) \n**2.** You did not join/you left the roblox group.\n**3.** You are a clan member, Clan members have their own rank on the group.\n**4.** You need to show a picture of ALL your stats, not just level.")
            }  
            else {
                message.channel.send("Insufficient Permissions.");
            }
        break;
        case "pleb": 
            message.channel.send("PostmanSAM");
        break;
        case "shitsorry":
            message.channel.send("https://cdn.discordapp.com/attachments/248201103311634433/375027459327918080/shitsorry.png");
        break;
            
        case "enter":
            message.channel.send("https://cdn.discordapp.com/attachments/187018991074541568/307967143079837698/Hitting_Enter_Meme.jpg");
        break; 
        case "drderp":
            message.channel.send("You'll never be mod.");
        break;  
        case "enderking":
            message.channel.send("https://tenor.com/view/asian-dance-gif-6014113");
            break;
        case "iown":
            message.channel.send("iown is king lol");
            break;
        case "sheep":
            message.channel.send("iown wants to fuck my cousin, she's a goat!!!!11");
            break;
        case "meme":
            message.channel.send("YOU JUST GOT MEME'D BY........Azsures!!!!");
            break; 
            
        case "azuricus":
            message.channel.send("competitive legos... and then step on them.");
            break;
            
        case "daddy":
            message.channel.send("daddy koods is my true passion i love him");
            break;
        case "validtokick":
            let role3 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role3.id)) {
            message.channel.send("Fetching the list of users valid to kick... Please allow up to **5** minutes.");
            require('./validtokick.js')(1000000, message.channel)                
            }
            else {
                message.channel.send("Insufficient Permissions.");
            }
        break;            
        case "trickked": 
            message.channel.send("Trick? You mean maxxed? https://gyazo.com/5701dec0bb357b688df1c15977a59920");
        break;
        case "sneeze":
            message.channel.send("https://www.youtube.com/watch?v=EvqHm37L1do&feature=youtu.be");
        break;
            
        case "sabrina":
            message.channel.send("Sabrina: https://cdn.discordapp.com/attachments/224193833506701312/385947836610772992/dancinbb.gif");
            message.channel.send("**iOwn:** https://www.youtube.com/watch?v=tyrKeThaEJM");
        break;
        case "kys":
            message.channel.send("KYS = Keep yourself safe.");
        break;
        case "tung":
            message.channel.send("TUTURU! UR GAYYYYYYYYYYYYYYYY");
        break;
        case "faggot":
            message.channel.send("https://cdn.discordapp.com/attachments/224193833506701312/388680687378497546/faggot.png");
        break;
        case "testing":
            message.channel.send(arr.join("\n"));
        break;
        case "christmas":
            message.channel.send("iown wishes y'all niggers merry christmas or whatever idk... i'm jewish tbh happy hanukkah motherfuckers");
        break;
       default:
            message.channel.send("no such command bro");
    }
});

bot.login(process.env.BOT_TOKEN);
