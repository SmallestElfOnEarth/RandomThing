module.exports = {
	commandlist: function (c, u){
		c.send ('<@' + u.id + '>', {
			embed: {
				title: 'waddup',
				description:'a command introducing the bot.'
        title: 'info'
        description: 'a command with general useless info'
			}
		})
	},
};
