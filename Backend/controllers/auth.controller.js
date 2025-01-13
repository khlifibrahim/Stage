import bcryptjs from 'bcryptjs';
import { generateVerificationCode } from '../utils/generateVerificationCode.js';
import { User } from '../modules/user.module.js';


export const login = async (req, res) => {
    const {username, password} = req.body; 
    try {
        const user = await User.findOne({username})
        console.log(user)
        if(!user) {
            return res.status(400).json({success: false, message: "invalid credentials"})
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }

        generateVerificationCode(res, user._id);
        user.lastLogin = new Date();

        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged succefully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    }catch (e) {
        console.log("Error in login: ", e);
        res.status(400).json({success: false, message: e.message})
    }
}
export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success: true, message: "logged out successfully"})
}
export const signup = async (req, res) => {
    const {username, email, password, first_name, last_name, phone, status} = req.body
    try {
        if(!username || !email || !password || !first_name || !last_name || !phone || !status) {
            throw new Error('All fields are required')
        }
        const userAlreadyExists = await User.findOne({username})
        console.log("line 30", userAlreadyExists)
        if(userAlreadyExists) {
            return res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            username, 
            email, 
            password: hashedPassword,
            first_name,
            last_name,
            phone,
            status,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save()
        generateVerificationCode(res, user._id)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    }catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}