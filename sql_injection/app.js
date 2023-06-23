
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const sqlite3 = require('sqlite3').verbose();
const { Sequelize, DataTypes } = require("sequelize")
const { check, validationResult } = require('express-validator');

const main = async () => {

    const app = express();
    app.use(serveStatic(__dirname + '/public', { 'index': ['index.html'] }));
    app.use(bodyParser.urlencoded({ extended: true }));

    const db = new sqlite3.Database(':memory:');
    db.serialize(function() {
      db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
      db.run("INSERT INTO user VALUES ('admin', 'admin123', 'App Administrator')");
    });

    // // orm config
    // const sequelize = new Sequelize('sqlite::memory:', {
    //     define: {
    //         freezeTableName: true
    //     }
    // });
    // const User = sequelize.define('user', {
    //     username: DataTypes.TEXT,
    //     password: DataTypes.TEXT,
    //     name: DataTypes.TEXT,
    // });

    // await User.sync()

    // await User.create({
    //     username: 'admin',
    //     password: 'admin123',
    //     name: 'App Administrator',
    // })

    var loginValidate = [
        // check('username', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),
        // check('username').trim().escape(),
        check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').trim().escape()
    ];

    // a valid username is admin
    // a valid password is admin123 
    // a invalid password is unknown' or '1'='1
    // test username is admin'; DROP TABLE user; --
    app.post('/login', loginValidate, function (req, res) {
        const username = req.body.username; 
        const password = req.body.password;         

        const validateErr = validationResult(req)
        if(!validateErr.isEmpty()) return res.send(validateErr)

        // concat string
        const queryPrepare = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";
        
        db.get(queryPrepare , function(err, value) {
            console.log({value})

            if(err) {
                console.log('ERROR', err);
                res.send({msg: "Error"})
            } else if (!value) {
                res.send({msg: "Invalid credentials"})
            } else {
                res.send({value});
            }
        });

        /* parameters */
        // const queryPrepare = db.prepare("SELECT name FROM user where username = (?) and password = (?)");
        // queryPrepare.each(username, password, function(err, value) {
        //     res.send({value})
        // }, function(err, count) {
        //     res.send({msg: "Invalid credentials"})
        //     queryPrepare.finalize();
        // });

        console.log("username: " + username);
        console.log("password: " + password);
        // console.log('query: ' + queryPrepare);

        // // orm
        // User.findOne({
        //     where: {
        //         username,
        //         password
        //     }, attributes: ['name']
        // }).then(value => {
        //     if(!value) return  res.send({ msg: "Invalid credentials" })
        //     res.send({ value })}).catch(err => res.send({ msg: "Invalid credentials" }))

        
    });

    app.listen(3000, function () { console.log('listening'); });
}

main()