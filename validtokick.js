var clanMembers = require ('./clanmembers.js');
var clanIgnore = require ('./clanogs.js');

var http = require ('http');
var timeout = (1000 * 60 * 720); 
var scanDelay = (1000 * 60 * 5); 

var httpGet = function (url, callback){
	http.get (url, function (res){
		var ret = "";
		
		res.on ('data', function (data){
			ret += data;
		});
		res.on ('end', function (){
			var p = ret;
			try {
				p = JSON.parse (ret);
			} catch (err){
			    console.log ('Error occured while parsing', err);	callback ([]);
			};
			
			try {
				callback (p);
			} catch (err) {
			    console.log ('Error occured during callback', err);	callback (false);
			};
		});
	});
};

var scan;
var scannedMembers = [];
var scanInProgress = true;
	scan = function (){
		var newScanned = [];
		var expire = Date.now() + timeout;
		var index = -50;
		var nextPage;
			nextPage = function(){
				index += 50;
				httpGet ('http://www.roblox.com/leaderboards/game/json?targetType=0&distributorTargetId=113491250&timeFilter=2&startIndex=' +  index + '&currentRank=1&previousPoints=3372937&max=50&imgWidth=48&imgHeight=48&imgFormat=PNG', function (data){
					if (Date.now() >= expire || typeof(data)!= "object" || data.length == 0 || scannedMembers.length == clanMembers.length) {
						console.log ('Scan finished', scannedMembers, data, scanInProgress);
						if (newScanned.length > 0) scannedMembers = newScanned;
						scanInProgress = false;
						setTimeout (scan, scanDelay);
						return;
					};
					
					data.forEach (function (query){
						if (query.ClanName == 'Phantom Rangers || Competitive PF Team')
							newScanned.push (query);
					});
					nextPage ();
				});
			};
		nextPage();
	};
	
	setTimeout (scan, 0);
	
var m = function (points, channel){
	if (scanInProgress)
		return channel.send ('Unable to process command, initial scan still in progress');
	
	scannedMembers.sort (function (a, b){
		return (a.Points == b.Points ? 0 : (a.Points < b.Points ? -1 : 1));
	});
	
	var embed = {
		title: "Members found with less than " + points + " points!",
		description: "Total members scanned: " + scannedMembers.length,
		fields: []
	};
	
	scannedMembers.forEach (function (query){
		if (!clanIgnore.find (j => query.Name.toLowerCase() == j.toLowerCase()) && query.Points < points && embed.fields.length < 24)
			embed.fields.push ({
				name: (embed.fields.length + 1) + '. ' + query.Name + " (" + query.UserId + ")",
				value: "Points: " + query.Points + " | Rank: " + query.Rank
			});
	});
	
	clanMembers.forEach (function (userName){
		if (!clanIgnore.find (j => j.toLowerCase() == userName.toLowerCase()) && !scannedMembers.find (j => j.Name == userName) && embed.fields.length < 24)
			embed.fields.push ({
				name: userName,
				value: "This member was not found on the list, far below required points"
			});
	});
	
	channel.send ('', {
		embed: embed
	});
};

module.exports = m;
