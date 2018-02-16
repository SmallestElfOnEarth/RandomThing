var rbx = require('roblox-js');
var username = 'rpgwill'
var password = 'rpgwill11'
function login(){
 rbx.login(username,password);
}
module.exports = {
  payout: function(c,u,user,amount){
  login()
  .then(function(){
   rbx.getCurrentUser()
   rbx.groupPayout(2817199,user,amount); 
   c.send('<@' + u.id + '>,'+ amount + ' robux has been successfuly paid to '+ user +'!');
  });
 }
}
   
