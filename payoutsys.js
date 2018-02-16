var rbx = require('roblox-js');
var username = 'rpgwill'
var password = 'rpgwill11'
function login(user,pass){
 rbx.login(user,pass);
}
module.exports = {
  payout: function(c,u,user,amount){
  login(username,password)
   rbx.getCurrentUser()
   rbx.groupPayout(2817199,user,amount,false,false); 
   c.send('<@' + u.id + '>,'+ amount + ' robux has been successfuly paid to '+ user +'!');
  }
 }

   
