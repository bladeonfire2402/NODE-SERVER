import {Router} from 'express'
import authController from '../controllers/authController.js'

const authRouter=Router()

//Đăng kí
authRouter.post('/signUp',authController.signUp);
//Đăng nhập
authRouter.post('/signIn',authController.singIn);

export default authRouter

