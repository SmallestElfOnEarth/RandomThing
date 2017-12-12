const Discord = require("discord.js"); 
requestjson = require('request-json');
var arr = require('./clanmembers');
var arrog = require('./clanogs');
var client = requestjson.createClient('https://www.roblox.com/');
var clanfound = [];
var playerscore = [];
var playerfound = ""
var scorereq = 3000000

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



function PullLeaderboard_WithName(time, startindex,name) {
    wait(10);
    if (time == 'alltime')
        time = 3;
    else if(time == 'monthly')
        time = 2;
    else if(time == 'weekly')
        time = 1;
    else if(time == 'daily')
        time = 0;
       
    client.get("leaderboards/game/json?targetType=0&distributorTargetId=113491250&timeFilter=" + time + "&startIndex=" + startindex + "&currentRank=1&previousPoints=0&max=500000&imgWidth=48&imgHeight=48&imgFormat=PNG", function (err, res, body) {
        const boi = (body).filter(({Name}) => Name === name);
        
        Object.keys(boi).map((key) => {
            //clanfound.push(body[key].Name);
           // if (body[key].Name == name) {
                playerfound = "The score for " +name+ " is: " + boi[0].FullPoints;
          //  }
           // console.log(number + ".Name: " + boi[key].Name + " Score:" + boi[key].FullPoints + " Position:" + boi[key].Rank);
          //  number++;
      });
      return null;
    });
}
var i = 0;




function PullLeaderboard(time, startindex) {
    wait(10);
    client.get("leaderboards/game/json?targetType=0&distributorTargetId=113491250&timeFilter=" + time + "&startIndex="+startindex+"&currentRank=1&previousPoints=988541&max=20&imgWidth=48&imgHeight=48&imgFormat=PNG", function (err, res, body) {
        const boi = (body).filter(({ClanName}) => ClanName === 'Phantom Rangers || Competitive PF Team');
        Object.keys(boi).map((key) => {
            clanfound.push(boi[key].Name);
            if (boi[key].Points > scorereq) {
                 clanfound.push(boi[key].Name);
                console.log(boi[key].Name+" passed the score req with "+boi[key].Points);
            }
         //   console.log(number + ".Name: " + boi[key].Name + " Score:" + boi[key].FullPoints + " Position:" + boi[key].Rank);
            //number++;
        });
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
                const filteredArray = arr.filter(function(x) { 
                 return clanfound.indexOf(x) < 0;
                });
                 filteredArray = arrog.filter(function(x) { 
                 return clanfound.indexOf(x) < 0;
                });
                message.channel.send("List of users the scanner couldnt find, Meaning they are position 27,500 or more\nOr they have a score of " + scorereq + " or less : \n **"+ arr.join("\n") + "**");
    
            }
            else {
                message.channel.send("Insufficient Permissions.");
            }
        break;
        case "search":
            playerfound = "";
            let role4 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role4.id)) {
                var name = args[2];
                var time = args[1];
                
                var i = 0;
                while (i < 650) {
                    PullLeaderboard_WithName(time, i * 50,name);
                    i++
                }
                if (playerfound != ""){
                message.channel.send(playerfound);
                playerfound = "";
                }
                else message.channel.send("Could not find "+name);
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
       default:
            message.channel.send("no such command bro")
    }
});

bot.login(process.env.BOT_TOKEN);
