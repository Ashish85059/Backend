import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError}from "../utils/ApiError.js"
import {ApiResponse}from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser=asyncHandler(async (req,res)=>{
    const {fullname,email,username,password}=req.body;
    // console.log("Emali: ",email)

    if(
        [fullname,email,username,password].some((feild)=>feild?.trim ==="") // agar ek bhi empty hua toh true return hoga
    ){
        throw new ApiError(400,"All feilds are required")
    }

    const existingUser=User.findOne({
        $or :[{username},{email}] // agar ek bhi match hua toh return hoga data
    })

    if(existingUser){
        throw new ApiError(409,"User already exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocaLPAth=req.files?.coverImage[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }
    
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocaLPAth);
    if(!avatar){
        throw new ApiError(400,"avatar file is required")
    }

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
     })   

     const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
     )
     if(!createdUser){
        throw new ApiError(500,"Something went Wrong")
     }
     return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
     )

})


export {registerUser}