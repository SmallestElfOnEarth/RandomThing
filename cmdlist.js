const Discord = require("discord.js"); 
module.exports = {
	commandlist: function (c, u){
		const embed = new Discord.RichEmbed()
			.setTitle("Command list")
			.setDescription("A list of all the bot commands.")
			.addField(">>waddup","A general introduction to the bot.")
			.addField(">>info","Just some general information.")
			.addField(">>asseating","Godstatus's command.")
			.addField(">>takeover","The true purpose of the bot.")
			.addField(">>pleb","PostmanSAM's command.")
			.addField(">>shitsorry","Lionehh's command.")
			.addField(">>enter","Seriously stop that..")
			.addField(">>drderp","DrDerp's command.")
			.addField(">>enderking","End_rr's command.")
			.addField(">>iown","iOwn_You's command.")
			.addField(">>sheep","Kolonoscopy's command.")
			.addField(">>meme","Azsures's command.")
			.addField(">>azuricus","Azuricus's command.")
			.addField(">>daddy","Kood's command.")
			.addField(">>trickked","Ma_ax's command.")
			.addField(">>sneeze","bless you")
			.addField(">>kys","A true meaning.")
			.addField(">>tung","Tungxeng's command.")
			.addField(">>faggot","u")
			.addField(">>kolonoscopy","Kolonoscopy's command.")
			.addField(">>uptime", "shows for how long the bot was up.")
			.addField(">>kris","fuck u godstatus <3")
			.addField(">>cmd","Displays this list.")
			
			c.send('<@' + u.id + '>',{embed});
			
			
			
			
			}
		})
	},
};
