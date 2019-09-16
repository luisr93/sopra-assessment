var request = require('request');
var clientProcedures = require("./clientProcedures");


var urlPolicies = "http://www.mocky.io/v2/580891a4100000e8242b75c5";
var urlClients = "http://www.mocky.io/v2/5808862710000087232b75ac";


var policyProcedures = {};




policyProcedures.findUserByPolicy = function (userId, policyNumber, callback){
    var policy = null,
        length,
        i = 0;
    validateRole(userId, function(role){                                    //get the role of the id
        if(role=="admin"){                                                          //analyze the role of the id
            request.get({url: urlPolicies, json: true,}, function (error, result, body){    //make an http request to the policies file
                if (!error){
                    data = body;
                    length = data.policies.length;
                    do{
                        if (data.policies[i].id==policyNumber){
                            policy = data.policies[i];                              //get if the policy number is on the file
                        }
                        i++;
                    }while(policy==null && i<length);                               //stop the search if the policy number is found or if it reaches the end of the file
                    if(policy==null){
                        callback("Can't find the policy number you are trying to search");          //throw a message if the policy number is not on the file
                    }else{
                    clientProcedures.findClientById(userId, policy.clientId, function(client){   //call the findClientById function using the id number found in the policy
                        callback(client);                                           //return the client
                    });
                    }
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




policyProcedures.findPoliciesByUserName = function (userId, userName, callback) {
    var client = null,
        policies = [],
        length,
        i = 0;
    validateRole(userId, function(role) {                                    //get the role of the id
        if (role == "admin") {                                                        //analyze the role of the id
            request.get({url: urlClients, json: true}, function (error, result, body) {  //make an http request to the clients file
                if (!error) {
                    data = body;
                    length = data.clients.length;
                    do {
                        if (data.clients[i].name == userName) {
                            client = data.clients[i];                                //get if the user name is on the file
                        }
                        i++;
                    } while (client == null && i < length);                         //stop the search if the user name is found or if it reaches the end of the file
                    if (client==null){
                        callback("Can't find the user name you are trying to search"); //throw a message if the user name is not on the file
                    }else{
                    request.get({url: urlPolicies, json: true}, function (error, result, body) {   //make an http request to the policies file
                        if (!error) {
                            data = body;
                            length = data.policies.length;
                            for (i = 0; i < length; i++) {
                                if (data.policies[i].clientId == client.id) {       //get all the policies linked to the client
                                    policies.push(data.policies[i]);
                                }
                            }
                            if (policies == ""){
                                callback("That user name has no policies linked");  //throw a message if the user name has no policies linked
                            }else{
                                callback(policies);                                 //return the policies
                            }
                        }
                    });
                    }
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

module.exports = policyProcedures;