// {
    const express = require('express');
    const bodyParser = require('body-parser');
    const serveStatic = require('serve-static');
    const sqlite3 = require('sqlite3').verbose();
    const { check, validationResult } = require('express-validator');
    
    const app = express();
    app.use(serveStatic(__dirname+ '/public', {'index': ['index.html']}));
    app.use(bodyParser.urlencoded({extended: true}));
    
    const db = new sqlite3.Database(':memory:');
    db.serialize(function() {
      db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
      db.run("INSERT INTO user VALUES ('admin', 'admin123', 'App Administrator'), ('admin2', 'admin123', 'App Administrator 2')");
    });
    // }

    // sanitizing
    var loginValidate = [
        // Check Username
        // check('username', 'Username Must Be an Email Address').isEmail()
        // .trim().escape().normalizeEmail(),
        // Check Password
        check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').trim().escape()];

    app.post('/login',loginValidate , function (req, res) {
        const username = req.body.username; // a valid username is admin
        const password = req.body.password; // a valid password is admin123 unknown' or '1'='1
        const query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";
    
        console.log("username: " + username);
        console.log("password: " + password);
        console.log('query: ' + query);
        
        db.get(query , function(err, row) {
            console.log({row})
            
            if(err) {
                console.log('ERROR', err);
                res.send({msg: "Error"})
            } else if (!row) {
                res.send({msg: "Invalid credentials"})
            } else {
                res.send({row});
            }
        });

        /* parameters */
        // const queryPrepare = db.prepare("SELECT name FROM user where username = (?) and password = (?)");
        // queryPrepare.each(username, password, function(err, row) {
        //     res.send({row})
        // }, function(err, count) {
        //     res.send({msg: "Invalid credentials"})
        //     queryPrepare.finalize();
        // });
      
    
    });

    
   
    // orm

    
    

app.listen(3000, function() { console.log('listening'); });
    
    