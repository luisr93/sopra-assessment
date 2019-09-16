var express = require('express');
var router = express.Router();
var policyProcedures = require("../procedures/policyProcedures");

/* GET users listing. */
router.get('/', function(req, res, next) {                              //route start
    var userId = req.query.user_id,                                     //get the user_id from the parameters
        isUserId = userId!=undefined && userId!="",                     //analyze if the user_id is empty
        userName = req.query.user_name,                                 //get the user name from the parameters
        isUserName = userName!=undefined && userName!="",               //analyze if the user name is empty
        policyNumber = req.query.policy_number,                         //get the policy number from the parameters
        isPolicyNumber = policyNumber!=undefined && policyNumber!= "";  //analyze if the policy number name is empty
    if (isUserId){
        if (isUserName && !isPolicyNumber){                             //analyze if the user name is the only search parameter
            policyProcedures.findPoliciesByUserName(userId, userName, function(client){   //call function to find the policies by user name
                res.send(client);                                       //print the results
            });
        }
        if (isPolicyNumber && !isUserName){                             //analyze if the policy number is the only search parameter
                policyProcedures.findUserByPolicy(userId, policyNumber, function(client){  //call function to find the user by user policy number
                    res.send(client);                                   //print the results
                });
            }
        if (isUserName && isPolicyNumber){                              //if they are trying to use both of the search parameters throw a message
            res.send("You can't filter by User Name and PolicyNumber at the same time");
        }
        if (!isUserName && !isPolicyNumber){                            //if they are not using any of the search parameters throw a message
            res.send("You have to filter by User Name or Policy Number");
        }
    }else{                                                              //if they didn't input the user id throw a message
        res.send("You have to enter your ID");
    }
});

module.exports = router;