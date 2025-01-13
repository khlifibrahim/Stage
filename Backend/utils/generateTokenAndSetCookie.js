import jwt from 'jsonwebtoken';

export const generateVerificationCode = (res, userId) => {
    try {
        console.log('Generating verification code for user:', userId);
        const token = jwt.sign({userId}, 'mysecretkey', {
            expiresIn: "7d",
        });
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully(generateVerificationCode.js) "
        })
    }catch (error) {
        res.status(500).json({success: false, message: "server error"})
    }

    return token;
};