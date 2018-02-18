const Discord = require("discord.js"); 
const fs = require('fs');
var logmessage = "";
var playerfound = "";
var Github = require('github-api');
var pendingvar = false;
require('./validtokick.js')
var username = "";
var amount = 0;
const PREFIX = ">>"
var bot = new Discord.Client();
bot.on("ready", function(){
    console.log("Ready bitch");
    bot.user.setActivity("with iown's genitalia.");
});




function convertrole(role){
   
  if (role == "0+"){
  role = 1;
  }
  else if(role=="20+"){
  role = 3;
  }
  else if(role=="30+"){
  role = 4;
  }
  else if(role == "40+"){
  role = 5;
  }
  else if(role== "50+"){
  role = 6;
  }
  else if(role=="80+"){
  role = 17;
  }
  else if(role == "90+"){
  role = 18;
  }
  else if(role == "100+"){
  role = 19;
  }
  else if(role == "125+"){
  role = 20;
  }
  else if(role == "150+"){
  role = 21;
  }
  else if(role == "175+"){
  role = 22;
  }
  else if(role == "200+"){
  role = 239;
  }
  else if(role == "clan"){
  role = 240;
  }
  else if(role == "comp"){
  role = 241;
  }
  return role;
}


var github = new Github({
  username: process.env.GITUSER,
  password: process.env.GITPASS,
  auth: "basic"
});
var repo = github.getRepo(process.env.GITUSER, "RandomThing");

function autoannounce(){
    var date = new Date();
    var channel = bot.channels.find("name","announcements");
    var day = date.getDay();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var challenge = "!challenge";
    if (day == 3 || day == 5){
        if( hours === 23 && mins == 1){
        channel.send("**Weekly challenge submissions due every Sunday! Type " + challenge + " in ** <#235888338366758912> ** to see what this week's gun is.**");
 }}}
    setInterval(autoannounce,60000);

function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}


setInterval (function(){
console.log ('30 mins keepalive!');
}, (30*60*1000));


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

var http = require('https');
var httpGet = function (url, callback){
    http.get (url, function (res){
        var ret = "";
        
        res.on ('data', function (data){
            ret += data;
        });
        res.on ('end', function (){
            callback (ret);
        });
    });
};


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
            console.log("arg1: "+args[1]+" arg2: "+args[2]+" arg3: "+args[3]+" arg4: "+args[4]);
            let role = message.guild.roles.find("name", "Staff Assistant | Bitches");
            if (message.member.roles.has(role.id)){           
             httpGet (`https://api.roblox.com/users/get-by-username?username=${args[1]}`, function (data){
             var data = JSON.parse (data);
             var ID = data.Id;
             var therole = convertrole(args[2]);
             console.log("ID:"+ID+" IGN:"+args[1]);
                 
             var rbx = require('roblox-js');
             var username = process.env.USERNAME1
             var password = process.env.PASSWORD1
            
             function login () {
               return rbx.login(username, password);
             }
             
              login()
             .then((function () {
             rbx.setRank(2683316,ID,therole);
             message.channel.send(data.Username+"'s role has been set!");
             }))
            
             });
                
             let user = message.mentions.users.first();
             message.guild.fetchMember (user) .then ((data) => {
             let member = message.mentions.members.first();
             if (args[2] == "comp"){
                 let comprole = message.guild.roles.find("name","Competitive Team");
                    member.addRole(comprole.id);
             }
              else if(args[2] == "clan"){
                    let clanrole = message.guild.roles.find("name","Clan Member");
                    member.addRole(clanrole.id);
              }
              else if(args[2] == "200+"){
                  let role200 = message.guild.roles.find("name","Level 200+");
                  member.addRole(role200.id );
              }
              else{
                  let memberrole = message.guild.roles.find("name","Member");
                    member.addRole("202542658634252289");
             }
                 }).catch (error => {
             //do something with error
                });  
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
                require('./validtokick.js').default(isNaN(Number(args[1])) ? 1000000 : Number(args[1]), message.channel);
            }
            else {
                message.channel.send("Insufficient Permissions.");
            }
        break; 
            
        case "vtk_stats":
            let role4 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role4.id)) {
                require('./validtokick.js').getCurrentCount(message.channel,message.author);
            }
            else{
                message.channel.send("Insufficient Permissions.");
            }
        break;
        case "vtk_setdelay":
            let role5 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role5.id)){
                require('./validtokick.js').setDelay(isNaN(Number(args[1])) ? 30 : Number(args[1]))
            }
            else{
                message.channel.send("Insufficient Permissions.");
            }
        break;
        case "vtk_setduration":
            let role6 = message.guild.roles.find("name", "Clan Manager");
            if(message.member.roles.has(role6.id)){
                require('./validtokick.js').setDuration(isNaN(Number(args[1])) ? 30 : Number(args[1]))
            }
            else{
            message.channel.send("Insufficient Permissions.");
            }
        break;
        case "vtk_getdelay":
            let role7 = message.guild.roles.find("name", "Clan Manager");
            if (message.member.roles.has(role7.id)){
                require('./validtokick.js').getDelay(message.channel,message.author)
            }
            else{
                message.channel.send("Insufficient Permissions.");
            }
        break;
        case "vtk_getduration":
            let role8 = message.guild.roles.find("name","Clan Manager");
            if (message.member.roles.has(role8.id)){
               require('./validtokick.js').getDuration(message.channel,message.author)
            }
            else{
                message.channel.send("Insufficient Permissions");
            }
        break;
        case"vtk_inprogress":
        let role9 = message.guild.roles.find("name", "Clan Manager");
        if (message.member.roles.has(role9.id)){
            require('./validtokick.js').isInProgress(message.channel,message.author)
        }
       else{
       message.channel.send("Insufficient Permissions.");
        }
       break;
        case "vtk_list":
        let role10 = message.guild.roles.find("name", "Clan Manager");
        if (message.member.roles.has(role10.id)){
            message.channel.send({embed: { title:"List of clan managerment commands:", 
                                          description: "**Valid to kick list:** >>validtokick\n\n **Current scan stats:** >>vtk_stats\n\n **Set the delay (how long between each scan):** >>vtk_setdelay\n\n **Set the duration (how long each scan lasts):** >>vtk_setduration\n\n **Look at the delay time:** >>vtk_getdelay\n\n **Look at the duration time:** >>vtk_getduration\n\n **Check if there's a scan in progress:** >>vtk_inprogress\n\n **Look at the list of VTK commands: **>>vtk_list"}})
        }
        else{
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
            console.log(args.length);
        break;
        case "christmas":
            message.channel.send("iown wishes y'all niggers merry christmas or whatever idk... i'm jewish tbh happy hanukkah motherfuckers");
        break;
        case "kolonoscopy":
            message.channel.send("If you read this, you're a six piece chicken Mcnobody");
        break;
        case "uptime":
            var uptime = process.uptime();
            message.channel.send("Uptime: "+ format(uptime));
        break;
        case "kris":
            message.channel.send("what a fucking lil bitch lmao");
        break;
        case "cmd":
            require("./cmdlist.js").cmdlist(message.channel,message.author);
        break;
        case "pay":
            let role14 = message.guild.roles.find("name","Admin");
            if(message.member.roles.has(role14.id)){
            message.channel.send("Are you sure you want to pay "+args[1]+" "+ args[2] +" Robux?");
            username = args[1];
            amount = args[2];
            sender = message.author.username
            pendingvar = true;
            } else{
              message.channel.send("Insufficient Permissions.");
            }
        break;
        case "yes":
            let role15 = message.guild.roles.find("name","Admin");
            if(message.member.roles.has(role15.id)){
              if (pendingvar == true){
             httpGet (`https://api.roblox.com/users/get-by-username?username=${username}`, function (data){
                var data = JSON.parse (data);
                    
             var ID = data.Id;
                 //repo.read('master', './transactionlogs.txt', function(err, data) {});
                 //require("./payoutsys.js").payout(message.channel,message.author,ID,amount,data.Username);
                 logmessage = "``A transaction by "+sender+" to "+data.Username+" with the amount of "+amount+" robux was confirmed.``\n\n";
                  repo.read('master', './transactionlogs.txt', function(err, data) {});
                 var fs = require('fs')
                 var logger = fs.createWriteStream('transactionlogs.txt', {flags:'a'})
                 logger.write(logmessage);
                 repo.write('master', './transactionlogs.txt', logger, 'nigawat', options, function(err) {});
                 

                    
                 pendingvar = false;
             });  
             
             }else{
             message.channel.send("There is no awaiting transaction");
                }
            }else{
            message.channel.send("Insiffucient permissions");
            }
       break;
       case "no":
            let role16 = message.guild.roles.find("name","Admin");
            if(message.member.roles.has(role16.id)){
                if (pendingvar == true){
                message.channel.send("Transaction Cancelled");
                pendingvar == false
                }else{
                message.channel.send("Insufficient Permissions");
                }}
       break;  
        case "paylogs":
            message.channel.send (fs.readFileSync ('transactionlogs.txt').toString ('ascii'));
        break;
       default:
            message.channel.send("no such command bro");
    };
});
bot.login(process.env.BOT_TOKEN);
