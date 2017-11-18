const Discord = require("discord.js"); 
requestjson = require('request-json');
var arr = require('./clanmembers');
var arrog = require('./clanogs');
var client = requestjson.createClient('https://www.roblox.com/');
var clanfound = [];
var playerscore = [];

//const TOKEN = "MzQyNjYxNzI4MTc1MjU5NjQ5.DGS4Jg.EjbL-_QR1AnRDgosj4PBB5qPOLc"
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







function PullLeaderboard(time, startindex) {
    wait(10);
    client.get("leaderboards/game/json?targetType=0&distributorTargetId=113491250&timeFilter=" + time + "&startIndex=" + startindex + "&currentRank=1&previousPoints=0&max=500000&imgWidth=48&imgHeight=48&imgFormat=PNG", function (err, res, body) {
        const boi = (body).filter(({ClanName}) => ClanName === 'Phantom Rangers || Competitive PF Team');
        Object.keys(boi).map((key) => {
            clanfound.push(boi[key].Name);
            if (boi[key].Points > 400000) {
                // clanfound.push(boi[key].Name);
            }
         //   console.log(number + ".Name: " + boi[key].Name + " Score:" + boi[key].FullPoints + " Position:" + boi[key].Rank);
            //number++;
        });
        arr = arr.filter(x => !~clanfound.indexOf(x));
        arr = arr.filter(x => !~arrog.indexOf(x));
    });
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
        case "day":
         var today = new Date();
            if (today.getDay() == 6)
                message.channel.send("today is  saturday bro");
            else if (today.getDay() == 5) 
                message.channel.send("today is friday bro, wooooo");
            else if (today.getDay() == 4)
                message.channel.send("today is thursday mate");
            else if(today.getDay() == 3)
                message.channel.send("today is wednesday");
            else if (today.getDay() == 2)
                message.channel.send("today is tuesday amigo ");
            else if (today.getDay() == 1) 
                message.channel.send("today is monday :(");
            else if (today.getDay() == 0)
                message.channel.send("today is sunday dude");
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

        case "calculate":
            let role2 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role2.id)) {

                var i = 0;
                while (i < 650) {
                    PullLeaderboard(2, i * 50);
                    i++
                }
                message.channel.send("Calculation Completed. Now procceed to >>validtokick or >>showscore.")
            }
            else {
                message.channel.send("Insufficient Permissions.");
            }
            break;

        case "validtokick":
            let role3 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role3.id)) {
                message.channel.send("Valid to kick list: \n" + arr);
            }
            else {
                message.channel.send("Insufficient Permissions.");
            }
           
        default:
            message.channel.send("no such command bro")
    }
});

bot.login(process.env.BOT_TOKEN);
