module.exports = {  
  payout: function(c,u,id,amount,rbxusername){
  var rbx = require('roblox-js');
     var username = process.env.USERNAME
     var password = process.env.PASSWORD
    function login () {
        return rbx.login(username, password);
    }
   login()
   .then((function () {
  // rbx.getCurrentUser()
   rbx.groupPayout(2817199,id,amount,false,false); 
   c.send('<@' + u.id + '>, '+ amount + ' Robux has been successfully paid to '+ rbxusername +'!');
  }))
 }
}


   
