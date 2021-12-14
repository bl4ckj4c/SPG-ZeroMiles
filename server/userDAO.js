'use strict';

const bcrypt = require('bcrypt');

exports.checkPassword = function(user, password){
    return user.Password == password;
    /*
    console.log("hash of: " + password);
    let hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    console.log("DONE");

    return bcrypt.compareSync(password, user.Password);
    */
}

exports.hashOfPassword = function(password){
    return bcrypt.hashSync(password, 10);
}