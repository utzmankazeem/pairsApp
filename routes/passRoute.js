import express from 'express';
const router = express.Router();
import {
    getIndex, 
    getEditPassenger, 
    postEditPassenger, 
    deletePassenger,
    aboutPage,
    contactPage
} from '../controller/passController.js';

router.route('/index')
.get(getIndex)
router.route('/about')
.get(aboutPage)
router.route('/contact')
.get(contactPage)
router.route('/edit/:id')
.get(getEditPassenger)
.post(postEditPassenger)
router.route('/delete/:_id')
.get(deletePassenger)

export default router;