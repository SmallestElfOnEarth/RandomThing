var rbx = require('roblox-js');
var username = 'rpgwill'
var password = 'rpgwill11'
module.exports = {
  payout: function(c,u,user,amount){
  console.log ('groupPayout ret check', rbx.groupPayout(2817199,user,amount));
  c.send('<@' + u.id + '>,'+ amount + " robux has been successfuly paid to "+ user +"!");
 }
}
