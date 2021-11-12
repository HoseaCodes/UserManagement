const auth = require('../utils/auth');
const router = require('express').Router();
const userCtrl = require('../controllers/user');


router.post('/register', userCtrl.register);

router.post('/create', userCtrl.addProfile);

router.post('/login', userCtrl.login);

router.route('/edit/:id').put(userCtrl.updateProfile)

router.get('/', userCtrl.getAllUsers);

router.get('/refresh_token', userCtrl.refreshToken);

router.get('/info', auth, userCtrl.getUser);


module.exports = router