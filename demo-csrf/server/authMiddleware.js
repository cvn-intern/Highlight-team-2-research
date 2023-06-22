 const db = require('./db')
 const jwt = require('jsonwebtoken')

 const JWT_SECRET_KEY = 'MY_SECRET_KEY';
 
  ///////////////////-----------CSRF PREVENTION---------------////////////////////////////////
//  const authenticateToken = (req, res, next) => {
//     let token
//     if (req.header('Authorization')) {
//       token = req.header('Authorization').split(' ')[1];
//   }
//   console.log(token);
//     if (!token) {
//       return res.status(401).end();
//     }
    
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET_KEY);
//       const sessionID = decoded.session;  
//       console.log("decoded: ", decoded);
      
//       const user = db.getUser(sessionID);
//       console.log(user);
//       if (!user) {
//         return res.status(401).end();
//       }
    
//       req.user = user;
//       return next();
//     }catch(err){
//         console.log(err);
//     }
// }
   ///////////////////-------------------END------------------////////////////////////////////



   
  ///////////////////-----------NON CSRF PREVENTION---------------////////////////////////////////
const authenticateToken = (req, res, next) => {
    const { session } = req.cookies;
    const user = db.getUser(session);
  
    if (!user) {
      return res.status(401).end();
    }
    req.user = user;
    return next();
  }
  ///////////////////-------------------END------------------////////////////////////////////

module.exports = {authenticateToken}