module.export = {
rankup: function(c,target,role,targetusername){
  var rbx = require('roblox-js');
  var username = process.env.USERNAME1
  var password = process.env.PASSWORD1
  
  if (role == "0+"){
  role = 1;
  }
  else if(role=="20+"){
  role = 3;
  }
  else if(role=="30+"){
  role = 4;
  }
  else if(role == "40+"){
  role = 5;
  }
  else if(role== "50+"){
  role = 6;
  }
  else if(role=="80+"){
  role = 17;
  }
  else if(role == "90+"){
  role = 18;
  }
  else if(role == "100+"){
  role = 19;
  }
  else if(role == "125+"){
  role = 20;
  }
  else if(role == "150+"){
  role = 21;
  }
  else if(role == "175+"){
  role = 22;
  }
  else if(role == "200+"){
  role = 239;
  }
  else if(role == "clan"){
  role = 240;
  }
  else if(role == "comp team"){
  role = 241;
  }
  
  
  
  function  login(){
  return rbx.login(username,password);
  }
  
  login()
  .then((function (){
  rbx.setRank(2683316,target,role)
  }
