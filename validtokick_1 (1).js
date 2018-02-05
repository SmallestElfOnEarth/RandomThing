var clanMembers = require ('./path/clanMembers.js');
var clanIgnore = require ('./path/clanIgnore.js');
var scannedMembers = [];
var firstScanInProgress = true;

var http = require ('http');
var httpGet = function (url, callback){
	console.log ('Attempting to get', url);
	return new Promise (function (resolve, reject){
		var body = '';
		http.get (url, function (res){
			res.on ('data', function (chunk){ body += chunk; });
			res.on ('end', function (){
				resolve (body);
			});
			
		//	setTimeout (function(){ reject('Timeout reached'); }, 150000);
		}).on ('error', function(err){
		    reject (err);
		});
	});
};
var timeout = (1000 * 60 * 5); 
var scanDelay = (1000 * 60 * 5); 

var beginIteration; beginIteration = function(){
	var n = 0;
	var l = [];
	var e = Date.now() + timeout;
	
	var i = function(){
		httpGet ('http://www.roblox.com/leaderboards/game/json?targetType=0&distributorTargetId=113491250&timeFilter=2&startIndex=' +  n + '&currentRank=1&previousPoints=3372937&max=50&imgWidth=48&imgHeight=48&imgFormat=PNG').then (function (res){
			var json;
			try {
				json = JSON.parse (res);
			} catch (err){
				json = [];
			};
			
			if (Date.now ()>= e || json.length == 0 || l.length == clanMembers.length){
				firstScanInProgress = false;
				
				if (l.length > 0){
					scannedMembers = l;
					console.log ('Set new array to array[' + scannedMembers.length + ']');
				};
				
				setTimeout (beginIteration, scanDelay);
			} else {
				json.forEach (function (m){
					if (m.ClanName == 'Phantom Rangers || Competitive PF Team'){
						l.push (m);
						
						console.log ('Pushed ' + m);
					};
				});
				
				i();
			};
		});
		n += 50;
	};
	
	i();
};

setTimeout (function(){ beginIteration(); }, 0);

module.exports = function (points, channel){
	if (firstScanInProgress)
		return channel.send ('Unable to process command, first scan still in progress!');

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