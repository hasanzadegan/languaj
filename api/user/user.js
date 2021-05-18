const query = require('../helpers/query');

module.exports = {
    findOrCreate: async function (profile, cb) {
        console.log("profile.emails[0].value",profile.emails[0].value)
        this.findByEmail(profile.emails[0].value).then(findResult=>{
            if(findResult.length===0){
                this.createUser(profile).then(createResult=>{
                    cb(null,createResult);
                });
            }
            else{
                console.log(findResult);
                cb(null,findResult[0]);
            }

        })
    },
    findByEmail: async function (email) {
        stmt = " select " +
            " userId,langId,email,firstName,lastName,imageUrl," +
            " isActive,credit,teacherShare,googleId,firstName1,lastName1 " +
            " from " +
            " user where email = ?";
        params = [email];
        return await query(stmt, params).then(function (result, err) {
            return result;
        })
    },
    createUser: async function (profile) {
        user = [
            1,
            profile.emails[0].value,
            profile.name.givenName,
            profile.name.familyName,
            profile.photos[0].value,
            profile._json.sub,
            1];
        stmt = 'INSERT INTO user(langId,email,firstName,lastName,imageUrl,googleId,isActive) ' +
            ' VALUES (?,?,?,?,?,?,?)';

        return await query(stmt, user).then(function (result, err) {
            var userObj = {
                userId:result.insertId,
                email:profile.emails[0].value,
                firstName:profile.givenName,
                lastName:profile.familyName,
                langId:1,
                imageUrl:profile.photos[0].value,
                googleId:profile.googleId,
            };
            return userObj;
        })
    }
}
