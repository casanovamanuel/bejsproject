import { Router } from 'express';
import userController from '../controller/user.controller.js';
import multer from 'multer';

const userRouter = Router()

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img/profile/')
    },
    filename: function (req, file, cb) {
        const date = Date.now()
        cb(null, 'u_' + req.user.id + '_' + date)
    }
})

const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img/document/')
    },
    filename: function (req, file, cb) {
        const date = Date.now()
        cb(null, 'd_' + req.user.id + '_' + date)
    }
})

const avatarFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/png') return cb(null, false)
    cb(null, true)
}

const documentFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') return cb(null, false)
    cb(null, true)
}

const avatarUpload = multer({ storage: avatarStorage, fileFilter: avatarFilter })
const documentUpload = multer({ storage: documentStorage, fileFilter: documentFilter })

userRouter.get(
    '/',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    userController.getUsers)

userRouter.delete(
    '/',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    userController.removeInactiveUsers
)

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
userRouter.get("/wellfare", userController.userValidation, userController.wellfareCheck)

userRouter.put(
    "/updateUser",
    userController.userValidation,
    userController.userAtuthorized("admin"),
    userController.update
)
userRouter.delete(
    "/deleteUser/:id",
    userController.userValidation,
    userController.userAtuthorized("admin"),
    userController.deleteUser
)

userRouter.post(
    '/premium/:id',
    userController.userValidation,
    userController.userAtuthorized("admin"),
    userController.premium
)

userRouter.put(
    '/setAvatar',
    userController.userValidation,
    userController.userAtuthorized("user"),
    avatarUpload.single('avatar'),
    userController.setAvatar
)

userRouter.get(
    '/getAvatar/:id',
    userController.userValidation,
    userController.userAtuthorized("user"),
    userController.getAvatar
)

userRouter.put(
    '/setdocuments',
    userController.userValidation,
    userController.userAtuthorized("user"),
    documentUpload.fields([
        { name: 'identityProof', maxCount: 1 },
        { name: 'addressProof', maxCount: 1 },
        { name: 'accountProof', maxCount: 1 }]),
    userController.setDocuments
)


export default userRouter;