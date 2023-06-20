
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const sqlite3 = require('sqlite3').verbose();
const { Sequelize, DataTypes } = require("sequelize")

const main = async () => {

    const app = express();
    app.use(serveStatic(__dirname+ '/public', {'index': ['index.html']}));
    app.use(bodyParser.urlencoded({extended: true}));
    
    // const db = new sqlite3.Database(':memory:');
    // db.serialize(function() {
    //   db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
    //   db.run("INSERT INTO user VALUES ('admin', 'admin123', 'App Administrator')");
    // });

    //orm config
    const sequelize = new Sequelize('sqlite::memory:', {
        define: {
          freezeTableName: true
        }
      });
    const User = sequelize.define('user', {
        username: DataTypes.TEXT,
        password: DataTypes.TEXT,
        name: DataTypes.TEXT,
    });

    await User.sync()

    await User.create({
        username: 'admin',
        password: 'admin123',
        name: 'App Administrator',
    })
   
    app.post('/login', async function (req, res) {
        const username = req.body.username; // a valid username is admin
        const password = req.body.password; // a valid password is admin123 unknown' or '1'='1
        const query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";
    
        console.log("username: " + username);
        console.log("password: " + password);
        console.log('query: ' + query);
        
        // db.get(query , function(err, value) {
        //     console.log({value})
            
        //     if(err) {
        //         console.log('ERROR', err);
        //         res.redirect("/index.html#error");
        //     } else if (!value) {
        //         res.redirect("/index.html#unauthorized");
        //     } else {
        //         res.send({value});
        //     }
        // });

        /* parameters */
        // const queryPrepare = db.prepare("SELECT name FROM user where username = (?) and password = (?)");
        // queryPrepare.each(username, password, function(err, value) {
        //     res.send({value})
        // }, function(err, count) {
        //     res.send({msg: "Invalid credentials"})
        //     queryPrepare.finalize();
        // });

        /* orm */
        User.findOne({where: {
            username,
            password
        }, attributes: ['name']}).then(value => res.send({value})).catch(err => res.send({msg: "Invalid credentials"})) 

    
    });

    // sanitizing
    

app.listen(3000, function() { console.log('listening'); });
    
}

main()