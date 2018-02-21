const Discord = require("discord.js");
const rbx = require("roblox-js");
const vtk = require('./validtokick.js');
const snk = require("snekfetch");
var mysql = require('mysql2');

var pendingvar = false;
var username = "";
var amount = 0;
var reason = "";
var role = 0;
var nextlevel = 0;
const rblxUser = process.env.USERNAME1
const rblxPass = process.env.PASSWORD1
const PREFIX = ">>";
var bot = new Discord.Client();
bot.on("ready", function () {
    console.log("ready");
    bot.user.setActivity("with iown's genitalia");
});


const connection = mysql.createPool({ connectionLimit: 10, database: 't89mmx70xyt82q9n', host: 'wyqk6x041tfxg39e.chr7pe7iynqr.eu-west-1.rds.amazonaws.com', user: 'uylam3r9h4df40rf', password: 'aq4nez71z3po5of8' });


connection.query(`CREATE TABLE if not exists transactionslog (
          transaction_id int(255) NOT NULL AUTO_INCREMENT,
          sender_id varchar(255) NOT NULL,
          receiver_id varchar(255) NOT NULL,
          sent_on DATE,
          amount int(255) NOT NULL,
          PRIMARY KEY (transaction_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1`, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });


//connection.query(`ALTER table transactionslog add column (reason varchar(255))`,function (err,result){ if(err) throw err; }); -- add column

//connection.query(`TRUNCATE TABLE transactionslog`, function(err,result){ if(err) throw err; });// -- wipe table


  function convertRole (role) {
    let roleNum = parseInt(role)
    let nextLevel
    if (roleNum >= 0 && roleNum < 20) {
      role = 1;
      nextLevel = 20;
      return { role, nextLevel }
    }
    if (roleNum >= 20 && roleNum < 30) {
      role = 3;
      nextLevel = 30;
      return { role, nextLevel }
    }
    if (roleNum >= 30 && roleNum < 40) {
      role = 4;
      nextLevel = 40;
      return { role, nextLevel }
    }
    if (roleNum >= 40 && roleNum < 50) {
      role = 5;
      nextLevel = 50;
      return { role, nextLevel }
    }
    if (roleNum >= 50 && roleNum < 80) {
      role = 6;
      nextLevel = 80;
      return { role, nextLevel }
    }
    if (roleNum >= 80 && roleNum < 90) {
      role = 17;
      nextLevel = 90;
      return { role, nextLevel }
    }
    if (roleNum >= 90 && roleNum < 100) {
      role = 18;
      nextLevel = 100;
      return { role, nextLevel }
    }
    if (roleNum >= 100 && roleNum < 125) {
      role = 19;
      nextLevel = 125;
      return { role, nextLevel }
    }
    if (roleNum >= 125 && roleNum < 150) {
      role = 20;
      nextLevel = 150;
      return { role, nextLevel }
    }
    if (roleNum >= 150 && roleNum < 175) {
      role = 21;
      nextLevel = 175;
      return { role, nextLevel }
    }
    if (roleNum >= 175 && roleNum < 200) {
      role = 22;
      nextLevel = 200;
      return { role, nextLevel }
    }
    if (roleNum >= 200) {
      role = 239;
      nextLevel = 0;
      return { role, nextLevel }
    }
    if (role === "clan") {
      role = 240;
      nextLevel = "Clan members dont rank up.";
      return { role, nextLevel }
    }
    if (role === "comp") {
      role = 241;
      nextLevel = "Competitive players dont rank up.";
      return { role, nextLevel }
    }
  }
  
  
  
  
  function robloxUpdateRank (robloxUsername,groupId, userId, roleFromArgs, callback) {
    let convertedRole = convertRole(roleFromArgs)
    let role = convertedRole.role
    if (isNaN(convertedRole.nextLevel)) return callback(convertedRole.nextLevel)
    rbx.login(rblxUser, rblxPass).then(() => {
      rbx.getPlayers(groupId, role).then(group => {
        for (let i = 0; i < group.players.length; i++) {
          if (group.players[i].id === userId) {
            if(convertedRole.nextLevel == 0 ){
                callback(robloxUsername+", Congratulations, You ranked up to the highest rank we currently offer! (200).");
            }else if(convertedRole.role == 1){
                callback(robloxUsername+", your rank isn't high enough! the minimum rank available is 20.");
            }else{
                callback(robloxUsername+", you already have that role assigned! Your next rankup is at level" + convertRole(roleFromArgs).nextLevel)
            }
            break;
          }
          if (i === group.players.length - 1) {
            rbx.setRank(groupId, userId, role).then(function (newRole) {
              console.log('The new role is: ' + JSON.stringify(newRole.Name));
              callback(null, JSON.stringify(newRole.Name))
            }).catch((err) => {
              console.log(err)
              callback("Can't change this user's role. (rank higher than the bot's)")
            })
          }
        }
      })
    }).catch(err => {
      console.log(err)
      callback("There was an error logging in to the roblox api")
    })
  }
  

function autoannounce() {
    var date = new Date();
    var channel = bot.channels.find("name", "announcements");
    var day = date.getDay();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var challenge = "!challenge";
    if (day == 3 || day == 5) {
        if (hours == 23 && mins == 1) {
            channel.send("**Weekly challenge submissions due every Sunday! Type " + challenge + " in ** <#235888338366758912> ** to see what this week's gun is.**");
        }
    }
}
setInterval(autoannounce, 60000);

function format(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


var http = require('https');
var httpGet = function (url, callback) {
    http.get(url, function (res) {
        var ret = "";

        res.on('data', function (data) {
            ret += data;
        });
        res.on('end', function () {
            callback(ret);
        });
    });
};

setInterval(function () {
    console.log('30 mins keepalive!');
}, (30 * 60 * 1000));




bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(PREFIX)) return;
    var args = message.content.substring(PREFIX.length).split(" ")
    let staffass = message.guild.roles.find("name", "Staff Assistant | Bitches");
    let clanmanager = message.guild.roles.find("name", "Clan Manager");
    let admin = message.guild.roles.find("name", "Admin");
    let mod = message.guild.roles.find("name","Moderator");
    let trialmod = message.guild.roles.find("name","Trial Moderator");
    let trialclan = message.guild.roles.find("name","Trial Clan Manager");
    let trialcomm = message.guild.roles.find("name","Trial Community Manager");
    
    switch (args[0].toLowerCase()) {
        case "waddup":
            message.channel.send("ay wassup my nigga im da bot");
            break;
        case "info":
            message.channel.send("ay waddup iown is my creator i worship him, also if you read his name you automatically become his personal property.");
            break;
        case "asseating":
            message.channel.send("if you wanna know how to eat ass you should contact godstatus");
            break;
        case "takeover":
            message.channel.send("I will do what iOwn wants to, iOwn wants me to take over PR! http://www.reactiongifs.com/wp-content/uploads/2013/09/evil-laugh.gif ");
            break;
        case "pleb":
            message.channel.send("PostmanSAM");
            break;
        case "shitsorry":
            message.channel.send("https://cdn.discordapp.com/attachments/248201103311634433/375027459327918080/shitsorry.png");
            break;
        case "drderp":
            message.channel.send("You'll never be mod");
            break;
        case "enderking":
            message.channel.send("https://tenor.com/view/asian-dance-gif-6014113")
            break;
        case "iown":
            message.channel.send("iown is king lol");
            break;
        case "sheep":
            message.channel.send("iown wants to fuck my cousin, she's a goat !!!!!11");
            break;
        case "meme":
            message.channel.send("YOU JUST GOT MEME'd BY......... Azsures!!!!");
            break;
        case "azuricus":
            message.channel.send("competitive legos... and then step on them.");
            break;
        case "daddy":
            message.channel.send("daddy koods is my true passion i love him");
            break;
        case "trickked":
            message.channel.send("Trick? You mean maxxed? https://gyazo.com/5701dec0bb357b688df1c15977a59920");
            break;
        case "sneeze":
            message.channel.send("https://www.youtube.com/watch?v=EvqHm37L1do&feature=youtu.be");
            break;
        case "sabrina":
            message.channel.send("**Sabrina:** https://cdn.discordapp.com/attachments/224193833506701312/385947836610772992/dancinbb.gif");
            message.channel.send("**iOwn:** https://www.youtube.com/watch?v=tyrKeThaEJM");
            break;
        case "kys":
            message.channel.send("KYS = Keep Yourself safe.");
            break;
        case "tung":
            message.channel.send("TUTURO! UR GAYYYYYYYYYYYY");
            break;
        case "faggot":
            message.channel.send("https://cdn.discordapp.com/attachments/224193833506701312/388680687378497546/faggot.png");
            break;
        case "kolonoscopy":
            message.channel.send("If you read this, You're a six piece chicken Mcnobody");
            break;
        case "kris":
            message.channel.send("what a fucking lil bitch lmao");
            break;
        case "cmd":
            require("./cmdlist.js").cmdlist(message.channel, message.author);
            break;











   case "rankup":
            if (message.member.roles.has(staffass.id) || message.member.roles.has("mod.id") || message.member.roles.has(clanmanager.id) || message.member.roles.has(trialmod.id) || message.member.roles.has(trialclan.id)|| message.member.roles.has(trialcomm.id))  {
      const groupId = 2683316
      if (!args.length) return message.channel.send("Missing arguments.")
      if (args.length <= 1) return message.channel.send("Missing arguments.")
      if (convertRole(args[2]).role >= 242) return message.channel.send(message.author.name+" You're trying to assign user to a role higher than the bot's")
      snk.get(`https://api.roblox.com/users/get-by-username?username=${args[1]}`)
          .then((resp) => {
            const robloxUser = JSON.parse(resp.text) // Using parse to transform it into an object
            const robloxUserId = robloxUser.Id
            const robloxUsername = robloxUser.Username
            snk.get(`https://api.roblox.com/users/${robloxUserId}/groups`)
                .then((res) => {
                  let groupsRespParsed = JSON.parse(res.text)
                  if (!groupsRespParsed.length) return message.channel.send(robloxUsername+",You're not in the group, Please join our group and resend your rankup.") // Some people won't have groups, so if they don't have one they're not in the one needed anyway !
                  for (let i = 0; i < groupsRespParsed.length; i++) {
                    if (groupsRespParsed[i].Id === groupId) {
                      robloxUpdateRank(robloxUsername,groupId, robloxUserId, args[2], (err, newRole) => {
                        if (err) return message.channel.send(err)
                        message.channel.send(robloxUsername+ ", you've been ranked up to " + newRole + "! Your next rankup will be at rank "+convertRole(args[2]).nextLevel)
                      })
                      break;
                    }
                    if (i === groupsRespParsed.length - 1) {
                     message.channel.send(robloxUsername+",You're not in the group, Please join our group and resend your rankup.")
                    }
                  }
                })
          })
          .catch(err => {
         // console.error(err);
          console.log("unable to find user");
      });
               let user = message.mentions.users.first();
                message.guild.fetchMember(user).then((data) => {
                    let memberrole = message.guild.roles.find("name","Member");
                    let therole = convertRole(args[2]).role
                    if (therole == 241) {
                        let comprole = message.guild.roles.find("name", "Competitive Team");
                        data.addRole(comprole.id);
                        data.addRole(memberrole.id);
                    }
                    else if (therole == 240) {
                        let clanrole = message.guild.roles.find("name", "Clan Member");
                        data.addRole(clanrole.id);
                        data.addRole(memberrole.id);
                    }
                    else if (therole == 239) {
                        let role200 = message.guild.roles.find("name", "Level 200+");
                        data.addRole(role200.id);
                        data.addRole(memberrole.id);
                    }

                }).catch(error => {
                console.error(error);
                });
                
                
                
    }
            else message.channel.send("Insufficient Permissions.");

            break;











        case "validtokick":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.default(isNaN(Number(args[1])) ? 1000000 : Number(args[1]), message.channel);
            }
            else message.channel.send("Insufficient Perms.");
            break;

        case "vtk_stats":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.getCurrentCount(message.channel, message.author);
            }
            else channel.message.send("Insufficient Permissions");
            break;

        case "vtk_setdelay":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.setDelay(isNaN(Number(args[1])) ? 30 : Number(args[1]));
            }
            else message.channel.send("Insufficient Permissions");
            break;

        case "vtk_setduration":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.setDuration(isNaN(Number(args[1])) ? 30 : Number(args[1]));
            }
            else message.channel.send("Insufficient Permissions");
            break;

        case "vtk_getdelay":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.getDelay(message.channel, message.author);
            }
            else message.channel.send("Insufficient Permissions");
            break;

        case "vtk_getduration":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.getDuration(message.channel, message.author);
            }
            else message.channel.send("Insufficient Permissions");
            break;

        case "vtk_inprogress":
            if (message.member.roles.has(clanmanager.id)) {
                vtk.isInProgress(message.channel, message.author);
            }
            else message.channel.send("Insufficient Permissions");
            break;

        case "vtk_list":
            if (message.member.roles.has(clanmanager.id)) {
                message.channel.send({
                    embed: {
                        title: "List of clan managerment commands:",
                        description: "**Valid to kick list:** >>validtokick\n\n **Current scan stats:** >>vtk_stats\n\n **Set the delay (how long between each scan):** >>vtk_setdelay\n\n **Set the duration (how long each scan lasts):** >>vtk_setduration\n\n **Look at the delay time:** >>vtk_getdelay\n\n **Look at the duration time:** >>vtk_getduration\n\n **Check if there's a scan in progress:** >>vtk_inprogress\n\n **Look at the list of VTK commands: **>>vtk_list"
                    }
                })
            }
            else message.channel.send("Insufficient Permissions");
            break;









        case "pay":
            if (message.member.roles.has(admin.id)) {
                message.channel.send("Are you sure you want to pay " + args[1] + " " + args[2] + " Robux?");
                username = args[1];
                amount = args[2];
                sender = message.author.username;
                reason = args[3]
                pendingvar = true;
            }
            else message.channel.send("Insufficient Permissions");
            break;

        case "yes":
            if (message.member.roles.has(admin.id)) {
                if (pendingvar) {
                    httpGet(`https://api.roblox.com/users/get-by-username?username=${username}`, function (data) {
                        var data = JSON.parse(data);
                        var ID = data.Id;
                        username = data.Username
                        //require("./payoutsys.js").payout(message.channel, message.author, ID, amount, data.Username);
                        pendingvar = false;
                    });
                         connection.query("INSERT into transactionslog (sender_id,receiver_id,sent_on,amount,reason) VALUES (?,?,?,?,?)", [sender,username, new Date(Date.now()).toLocaleString(),amount,reason], function (err) {
                          if (err) return console.log(err)
                         });
                }
                else message.channel.send("There is no pending transaction.");

            }
            else message.channel.send("Insufficient Permissions.");
            break;
        case "no":
            if (message.member.roles.has(admin.id)) {
                if (pendingvar) {
                    message.channel.send("Transaction Cancelled.");
                    pendingvar = false;

                }
                else message.channel.send("There is no pending transaction.");

            }
            else message.channel.send("Insufficient Permissions.");
            break;
        case "paylogs":
            if (message.member.roles.has(admin.id)) {
                 connection.query("SELECT * FROM transactionslog ORDER BY transaction_id DESC", (err, results) => {
                    if (err) return console.log(err)
                    if (!results.length) return message.channel.send("There's not transaction to show :( ")
                    let output = []
                    for (let i = 0; i < results.length; i++) {
                        let dateFromDb = new Date(results[i].sent_on)
                        let date = dateFromDb.getMonth()+1 + "/" + dateFromDb.getDate() + "/" + dateFromDb.getFullYear()
                        output.push("``ID:"+results[i].transaction_id+"  --A transaction by " + results[i].sender_id + " to " + results[i].receiver_id + " with the amount of " + results[i].amount + " $R was confirmed @ "+ date +" REASON: "+results[i].reason + "``")
                    }
                    message.channel.send(output.join("\n"))
                })
            } else message.channel.send("Insufficient Permissions.");
            break;
        default: message.channel.send("no such command bro");
    } //switch case end


}); // bot.on end

bot.login(process.env.BOT_TOKEN);
