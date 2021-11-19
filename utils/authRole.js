const Users = require('../models/user');

// async function authRole(roles) {
//     return (req, res, next) => {
//         try {
//             const newUser = await Users.findById(userId);

//             for (let role of roles) {
//                 if (newUser.role == role) {
//                     next();       
//                 }
//             }
            
//             return res.status(401).json({
//                 error: "Not allowed: You don't have enough permission to perform this action"
//                 });
            
//         } catch (error) {
//             return res.status(500).json({ msg: err.message });
//         }
//     }
// }

async function authRole(req, res, next) {
    console.log(req)
        try {
            const newUser = await Users.findById(userId);

            for (let role of roles) {
                if (newUser.role == role) {
                    next();       
                }
            }
            
            return res.status(401).json({
                error: "Not allowed: You don't have enough permission to perform this action"
                });
            
        } catch (error) {
            return res.status(500).json({ msg: err.message });
        }
    }


module.exports = authRole;