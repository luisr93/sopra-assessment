var express = require('express');
var router = express.Router();
var clientProcedures = require("../procedures/clientProcedures");






router.get('/', function(req, res, next) {                              //route start
  var userId = req.query.user_id,                                       //get the user_id from the parameters
      isUserId = userId!=undefined && userId!="",                       //analyze if the user_id is empty
      id = req.query.id,                                                //get the id to be searched from the parameters
      isId = id!=undefined && id!="",                                   //analyze if the id is empty
      userName = req.query.user_name,                                   //get the user name from the parameters
      isUserName = userName!=undefined && userName!="";                 //analyze if the user name is empty
  if (isUserId){
    if (isId && !isUserName){                                           //analyze if the id is the only search parameter
      clientProcedures.findClientById(userId, id, function(client){    //call function to find the client by id
        res.send(client);                                                      //print the results
      });
    }
    if (isUserName && !isId){                                           //analyze if the user name is the only search parameter
        clientProcedures.findClientByUserName(userId, userName, function(client){    //call function to find the client by user name
          res.send(client);                                             //print the results
        });
      }
    if (isUserName && isId){                                           //if they are trying to use both of the search parameters throw a message
        res.send("You can't filter by User Name and Id at the same time");
      }
    if (!isUserName && !isId){                                         //if they are not using any of the search parameters throw a message
      res.send("You have to filter by User Name or Id");
    }
  }else{                                                               //if they didn't input the user id throw a message
    res.send("You have to enter your ID");
  }
});

module.exports = router;
