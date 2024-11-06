import express from 'express';
const router = express.Router()
import {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    logout
} from '../controller/rootController.js';

router.route('/signup')
.get(getSignup)
.post(postSignup)
router.route('/')
.get(getLogin)
.post(postLogin)

router.get('/logout', logout)

export default router;