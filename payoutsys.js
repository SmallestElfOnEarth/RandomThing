var rbx = require('roblox-js');
var username = 'rpgwill'
var password = 'rpgwill11'
module.exports = {
  payout: function(c,u,user,amount,handler=console.log){
  rbx.login(username,password);
  rbx.groupPayout(2817199,user,amount)//.catch(handler);
  c.send('<@' + u.id + '>,'+ amount + " robux has been successfuly paid to "+ user +"!");
 }
}
   
