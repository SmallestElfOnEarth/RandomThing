module.exports = {  
  setrank: function(c,target,role,targetusername){
  var rbx = require('roblox-js');
     var username = process.env.USERNAME1
     var password = process.env.PASSWORD1
    function login () {
        return rbx.login(username, password);
    }
   login()
   .then((function () {
  // rbx.getCurrentUser()
  rbx.setRank(2683316,target,role);
  c.send(targetusername+"'s role has been set!");
  }))
 }
}
