var request = require('request');

var url = "http://www.mocky.io/v2/5808862710000087232b75ac";

var clientProcedures = {};




clientProcedures.findClientById = function (userId, id, callback){
    var client = null,
        length,
        i = 0;
    validateRole(userId, function(role){                                    //get the role of the id
        if(role=="admin" || role=="user"){                                          //analyze the role of the id
            request.get({url: url, json: true,}, function (error, result, body){    //make an http request to the clients file
                if (!error){
                    data = body;
                    length = data.clients.length;
                    do{
                        if (data.clients[i].id==id){
                            client = data.clients[i];                               //get if the id is on the file
                        }
                        i++;
                    }while(client==null && i<length);                               //stop the search if the id is found or if it reaches the end of the file
                }
                if (client==null) {
                    client = "Can't find the id you are trying to search";          //throw a message if the id is not on the file
                }else{
                callback(client);                                                   //return the client
                }
            });
        }else{
            if (role==null){
                callback("Can't find the user id you are trying to use");              //throw a message if the user id is not on the file
            }else{
                callback("You don't have authorization to look this information");     //throw a message if the role doesn't fit the authorization level
            }
        }
    });
}




clientProcedures.findClientByUserName = function (userId, userName, callback){
    var client = null,
        length,
        i = 0;
    validateRole(userId, function(role){                                    //get the role of the id
        if(role=="admin" || role=="user"){                                          //analyze the role of the id
            request.get({url: url, json: true,}, function (error, result, body){    //make an http request to the clients file
                if (!error){
                    data = body;
                    length = data.clients.length;
                    do{
                        if (data.clients[i].name==userName){
                            client = data.clients[i];                               //get if the user name is on the file
                        }
                        i++;
                    }while(client==null && i<length);                               //stop the search if the user name is found or if it reaches the end of the file
                }
                if (client == null){
                    callback("Can't find the user name you are trying to search");  //throw a message if the user name is not on the file
                }else{
                callback(client);                                                   //return the client
                }
            });
        }else{
            if (role==null){
                callback("Can't find the user id you are trying to use");              //throw a message if the user id is not on the file
            }else{
                callback("You don't have authorization to look this information");     //throw a message if the role doesn't fit the authorization level
            }
        }
    });
}




function validateRole(userId, callback){
    var role = null,
        length = 0,
        i=0;
    request.get({url: url, json: true,}, function (error, result, body){
        if (!error){
            data = body;
            length = data.clients.length;
            do{
                if (data.clients[i].id==userId){                                    //get if the user id is on the file
                    role = data.clients[i].role;
                }
                i++;
            }while(role==null && i<length);                                         //stop the search if the id is found or if it reaches the end of the file
        }
        callback(role);                                                             //return the role
    });
}

module.exports = clientProcedures;