import {Router} from 'express'
import authController from '../controllers/authController.js'


const authRouter=Router()


authRouter.post('/signup',authController.signUp);

export default authRouter

