const Users = require('../models/user');
const UnregisteredUser = require('../models/unregisteredUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRole = require('../utils/authRole');

const userCtrl = {
    register,
    refreshToken,
    login,
    getUser,
    getAllUsers,
    addProfile,
    updateProfile,
    deleteProfile,
    getUsers, 
    addUser, 
    getUserById, 
    editUser, 
    deleteUser
}

async function register(req, res) {
    try {
        const { username, name, email, password, bio, images } = req.body;
        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ msg: "The email already exists" })

        if (password.length < 6)
            return res.status(400).json({ msg: "Password is at least 6 characters long" })

        //Password Encryption
        const passwordHash = await bcrypt.hash(password, 10)

        //Create new user instance
        const newUser = new Users({
            username, name, email, password: passwordHash, bio, images
        })
        // Save mongodb
        await newUser.save()

        //Create jsonwebtoken for authentication
        const accesstoken = createAccessToken({ id: newUser._id })
        const refreshtoken = createRefreshToken({ id: newUser._id })

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })
        res.json({ accesstoken, status: "Register Successful" })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

function refreshToken(req, res) {
    try {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please Login or Register" })

            const accesstoken = createAccessToken({ id: user.id })

            res.json({ accesstoken })
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.status(400).json({ msg: "User does not exist." })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid password" })

        const accesstoken = createAccessToken({ id: user._id })
        const refreshtoken = createRefreshToken({ id: user._id })

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        })
        res.json({ status: "Success", accesstoken, data: user })
        // res.json({ msg: "Login successful" })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

async function getAllUsers(req, res) {
    try {
        const user = await Users.find();
        const unregisteredUser = await UnregisteredUser.find();
        if (!user) return res.status(400).json({ msg: "No users exist" });
        const allUsers = [unregisteredUser, user]
        res.json(allUsers);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

async function getUser(req, res) {
    try {
        const user = await Users.findById(req.user.id).select("-password");
        let granted = true;
        const access = ["basic", "supervisor","admin"];
        granted = authRole(access, user);
        if (!granted) {
            return res.status(401).json({
                error: "Not allowed: You don't have enough permission to perform this action"
            });
        }
        if (!user) return res.status(400).json({ msg: "User does not exist" });
        res.json(user);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

async function updateProfile(req, res) {
    try {
        const { name, email, role, createdAt, images, bio } = req.body;
        const userId = req.params.id;
        const newUser = await Users.findById(userId);
        let granted = true;
        const access = ["supervisor","admin"];
        granted = authRole(access, newUser);
        if (!granted) {
            return res.status(401).json({
                error: "Not allowed: You don't have enough permission to perform this action"
            });
        }
        const user = await Users.findOneAndUpdate({ _id: req.params.id }, {
          images, bio, role, name, email, createdAt,
        })

        res.json({
            status: 'Updated profile',
            data: user
        })
    } catch (err) {

        return res.status(500).json({ msg: err.message });
    }
}

async function deleteProfile(req, res) {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId);
        let granted = true;
        const access = ["admin"];
        granted = authRole(access, user);
        if (!granted) {
            return res.status(401).json({
                error: "Not allowed: You don't have enough permission to perform this action"
            });
        }
        const permission = roles.can(user.role)['deleteAny']('profile');
        if (!permission.granted) {
            return res.status(401).json({
                error: "You don't have enough permission to perform this action"
            });
        }
        await User.findByIdAndDelete(userId);

        res.status(200).json({
        data: null,
        message: 'User has been deleted'
        });
    }  catch (err) {

        return res.status(500).json({ msg: err.message });
    }
}

async function addProfile(req, res) {
    try {
        const { images, user } = req.body;
        const { name, bio } = user
        console.log(req.body)
        //Create new user instance
        const newUser = new UnregisteredUser({
            images, name, bio
        })
        console.log(newUser)
        // Save mongodb
        await newUser.save()

        return res.json({ data: newUser, status: "Added Profile Successful" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }
}

async function getUsers(req, res) {
    try{
        const users = await Users.find();
        res.status(200).json(users);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}

async function addUser(req, res) {
    const user = req.body;
    
    const newUser = new User(user);
    try{
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
}

async function getUserById(req, res) {
    try{
        const user = await Users.findById(req.params.id);
        res.status(200).json(user);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
}

async function editUser(req, res) {
    let user = req.body;

    const editUser = new Users(user);
    try{
        await Users.updateOne({_id: req.params.id}, editUser);
        res.status(201).json(editUser);
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
}

async function deleteUser(req, res) {
    try{
        await Users.deleteOne({_id: req.params.id});
        res.status(201).json("User deleted Successfully");
    } catch (error){
        res.status(409).json({ message: error.message});     
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl