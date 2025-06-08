import {  Router } from "express";
import {registerUser,LoginUser,LogoutUser,refreshaccessToken,changeCurrentPassword,getCurrentuser,updateuser,updateUserCoverImage,updateUseravatar,getUserCurrentProfile,getWatchHistory} from "../Controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtverification } from "../middlewares/auth.middleware.js";

const router=Router()
router.route("/register").post(
    upload.fields([
        {
         name:"avatar",
         maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(LoginUser)

//secuired route
router.route("/logout").post(jwtverification,LogoutUser)

router.route("/refresh-token").post(refreshaccessToken)
router.route("/change-password").post(jwtverification, changeCurrentPassword)
router.route("/current-user").get(jwtverification, getCurrentuser)
router.route("/update-account").patch(jwtverification, updateuser)

router.route("/avatar").patch(jwtverification, upload.single("avatar"), updateUseravatar)
router.route("/cover-image").patch(jwtverification, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(jwtverification, getUserCurrentProfile)
router.route("/history").get(jwtverification, getWatchHistory)

export default router