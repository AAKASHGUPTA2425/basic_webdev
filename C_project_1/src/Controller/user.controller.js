import { AsyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/ApiError.js";
import { User } from "../model/user.model.js";
import { uploadCloudinary } from '../utility/cloudinary.js'
import { ApiResponse } from "../utility/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const generateAccessandrefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while genreting access and refresh token")
    }
}

const registerUser = AsyncHandler(async (req, res) => {
    //get user detail from frontend
    //validation-not empty
    //check if user already exists:username,email
    //check image ,cheack avatar
    //upload them to cloudinary,avatar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return res

    const { fullname, username, email, password } = req.body
    console.log(req.body);//reminder: only to check what is inside it

    console.log("email:", email);

    if (
        [fullname, username, email, password].some((field) => field?.trim === "")
    ) {
        throw new ApiError(400, 'All field  is required')
    }
    const Userexist = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )
    if (Userexist) {
        throw new ApiError(409, "the email or username already exist")
    }


    console.log(req.files)//remider just for checking

    const avatarlocalpath = req.files?.avatar[0]?.path;
    // const coverImagelocalpath = req.files?.coverImage[0]?.path;
    let coverImagelocalpath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImagelocalpath = req.files.coverImage[0].path
    }

    if (!avatarlocalpath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadCloudinary(avatarlocalpath)
    const coverImage = await uploadCloudinary(coverImagelocalpath)

    console.log(avatar);

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")

    }
    const user = await User.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        username: username.toLowerCase()
    })
    const createduser = await User.findById(user._id).select("-password -refreshtoken")

    if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the users")

    }
    return res.status(201).json(new ApiResponse(200, createduser, "user registered successfully"))
})

const LoginUser = AsyncHandler(async (req, res) => {
    //teke email,password
    //verify email existence in the db and then compare the password(verify user exist)
    //if exist then access and refresh token
    //if not exist then throw error
    const { username, email, password } = req.body
    console.log(username);
    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "user not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user Credentials")
    }
    const { accessToken, refreshToken } = await generateAccessandrefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const LogoutUser = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshaccessToken = AsyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessandrefreshToken(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body



    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentuser = AsyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, 'current user is fetched sucessfully'))
})
const updateuser = AsyncHandler(async (req, res) => {
    const {username,  fullname, email } = req.body
    if (!username|| !fullname || !email) {
        throw new ApiError(401, 'all field are required')
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,

        {
            $set: {
                 username:username,
                fullname:fullname,
                email:email,
               
            }
        }, { new: true }
    ).select('-password')
    return res.
        status(200)
        .json(new ApiResponse(200, user, 'all the updates are done'))
})
const updateUserCoverImage = AsyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    //TODO: delete old image - assignment
    const existuser = await User.findById(req.user?._id)
    if (!existuser) {
        throw new ApiError(400, "user not exist")

    }
    if (existuser.coverImage?.public_id) {
        await cloudinary.uploader.destroy(existuser.coverImage.public_id);
    }


    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Cover image updated successfully")
        )
})
const updateUseravatar = AsyncHandler(async (req, res) => {

    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is missing")
    }
    const existuser = await User.findById(req.user?._id)
    if (!existuser) {
        throw new ApiError(401, "user is not exist")
    }
    if (existuser.avatar?.public_id) {
        await cloudinary.uploader.destroy(existuser.avatar.public_id);
    }


    const avatar = await uploadCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "avatar updated successfully")
        )
})
const getUserCurrentProfile = AsyncHandler(async (req, res) => {
    const { username } = req.params
    if (!username) {
        throw new ApiError(400, "user is not registered")
    }
    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase
            }
        }, {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        }, {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        }, {
            $addFields: {
                subscriberCounts: {
                    $size: "$subscribers"
                },
                channelSubcribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }

            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ])
    if (!channel?.length) {
        throw new ApiError(404, 'channel does not exist')
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, channel[0], "User channel fetched successfully")
        )
})
const getWatchHistory = AsyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user[0].watchHistory,
                "Watch history fetched successfully"
            )
        )
})
export { registerUser, LoginUser, LogoutUser, refreshaccessToken, changeCurrentPassword, updateUserCoverImage, updateUseravatar, getCurrentuser, updateuser, getUserCurrentProfile, getWatchHistory }
