var clanMembers = require ('./path/clanMembers.js');
var clanIgnore = require ('./path/clanIgnore.js');
var scannedMembers = [];
var firstScanInProgress = true;

var http = require ('http');
var httpGet = function (url, callback){
	return new Promise (function (resolve, reject){
		var body = '';
		http.get (url, function (res){
			res.on ('aborted', function (){
				reject (new Error ('Aborted!'));
			});
			res.on ('data', function (chunk){ body += chunk; });
			res.on ('end', function (){
				resolve ({body: body, url: url, res: res});
			});
			
		//	setTimeout (function(){ reject('Timeout reached'); }, 150000);
		}).on ('error', function(err){
		    reject (err);
		});
	});
};
var timeout = (1000 * 60 * 120); 
var scanDelay = (1000 * 60 * 5); 
var l = [];
var n = 0;
var s = 0;

var beginIteration; beginIteration = function(){
	n = 0;
	l = [];
	s = new Date();
	var e = Date.now() + timeout;
	
	var i = function(inc = 50, c = 0){
		httpGet ('http://www.roblox.com/leaderboards/game/json?targetType=0&distributorTargetId=113491250&timeFilter=2&startIndex=' +  n + '&currentRank=1&previousPoints=3372937&max=50&imgWidth=48&imgHeight=48&imgFormat=PNG').then (function (res){
			var json = null, skip = false;
			try {
				json = JSON.parse (res.body);
			} catch (err){
				//console.log ('An error occured when trying to parse', res.body.substring (0, 100), res.url);
				json = [];
				skip = true;
			};
			
			if (skip && c <= 3){
				return	setTimeout (function(){	console.log (`${new Date()}` + ': Attempt #' + (c + 1) + ' on ' + res.url); i(0, c + 1); }, 10000); //retry this page in 10 seconds
			} else if (skip){
				return i (50); //skip to next page
			}
			if (Date.now ()>= e || json.length == 0 || l.length == clanMembers.length){
				firstScanInProgress = false;
				
				if (l.length > 0){
					scannedMembers = l;
					console.log ('Set new array to array[' + scannedMembers.length + ']', 'reason:', Date.now()>= e ? 'Expire': (json.length == 0 ? 'Empty json' : 'All members found'));
				};
				
				setTimeout (beginIteration, scanDelay);
			} else {
				json.forEach (function (m){
					if (m.ClanName == 'Phantom Rangers || Competitive PF Team'){
						l.push (m);
					//	console.log ('Found', m.Name);
					};
				});
				
				i(n == 62650 ? 100 : 50);
			};
		}).catch (function (err){
			firstScanInProgress = false;
			if (l.length > 0)
				scannedMembers = l;
			setTimeout (beginIteration, scanDelay);
			console.log ('An error has occured: ' + err);
		});
		
		if ( c >= 2 ){
			inc = 50;
		};
		n += inc;
	};
	
	i();
};

setTimeout (function(){ beginIteration(); }, 0);

module.exports = {
	default: function (points, channel){
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
		
		var lineBreak = false;
		var userNameIndex = 0;
		clanMembers.forEach (function (userName){
			if (!clanIgnore.find (j => j.toLowerCase() == userName.toLowerCase()) && !scannedMembers.find (j => j.Name == userName)){
				if (!lineBreak){
					lineBreak = true;
					embed.description += '\n**The following members had less than ' + scannedMembers[0].Points + ' points and were not found in-time!**\n';
				};
				
				userNameIndex ++;
				embed.description += (userNameIndex % 4 == 0 ? '\t' : userName + ', ');
			};
		});
		
		channel.send ('', {
			embed: embed
		});
	},
	
	setDelay: function (n){
		n = Number(n);
		if (isNaN (n))
			throw ('Unable to set to NaN');
		if (n > 1000)
			throw ('Unable to set to past 1000 minutes');
		if (n <= 1)
			throw ('Unable to set to equal or below to 1 minute');
		
		scanDelay = n * (60 * 1000);
	},
	setDuration: function (n){
		n = Number(n);
		if (isNaN (n))
			throw ('Unable to set to NaN');
		if (n > 1000)
			throw ('Unable to set to past 1000 minutes');
		if (n <= 1)
			throw ('Unable to set to equal or below to 1 minute');
		
		timeout = n * (60 * 1000);
	},
	
	getDelay: function (c, u){
		c.send ('<@' + u.id + '>', {
			embed: {
				title: 'Current scan delay: ',
				description: (scanDelay / (60 * 1000)) + ' minute(s)'
			}
		})
	},
	getDuration: function (c, u){
		c.send ('<@' + u.id + '>', {
			embed: {
				title: 'Current scan delay: ',
				description: (timeout / (60 * 1000)) + ' minute(s)'
			}
		})
	},
	getCurrentCount: function (c, u){
		c.send ('<@' + u.id + '>', {
			embed: {
				title: 'Current count info',
				description: 'Current scanned count: ' + scannedMembers.length + '\nCurrent in-scan count: ' + l.length +
					'\nCurrent scan index: ' + n + '\nScan started: ' + s + '\nNow: ' + new Date()
			}
		})
	},
	isInProgress: function (c, u){
		c.send ('<@' + u.id + '>', {
			embed: {
				title: 'Scan in progress: ',
				description: l.length > 0 ? 'true' : 'false'
			}
		})
	},
};
