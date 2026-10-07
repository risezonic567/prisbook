import User from '../models/UserModels.js'
import mailer from '../mailer/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

import passwordValidator from 'password-validator'

var schema = new passwordValidator()
var client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_KEY)

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


export async function createRecord(req, res) {
    if (req.body.password) {
        if (schema.validate(req.body.password)) {
            await bcrypt.hash(req.body.password, 12, async (error, hash) => {
                if (error) {
                    res.send({
                        result: "Fail",
                        message: "Inetrnal Server Error"
                    })
                }
                else {
                    try {

                        let data = new User(req.body)
                        data.password = hash
                        await data.save()

                        res.send({
                            result: "Done",
                            data: data
                        })

                        mailer.sendMail({
                            from: process.env.MAILER,
                            to: data.email,
                            subject: `Welcome Aboard! ✈️ Your ${process.env.SITE_NAME} Account is Ready`,
                            html: `
       <tr>
        <td style="background-color:#0b3d91; padding:25px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:26px; font-family: 'Segoe UI', Arial, sans-serif;">
                ✈️ ${process.env.SITE_NAME}
            </h1>
        </td>
    </tr>

    <tr>
        <td style="padding:40px 30px; color:#333333; font-family: 'Segoe UI', Arial, sans-serif; background-color: #ffffff;">
            <h2 style="color:#0b3d91; margin-top:0; font-size: 22px;">Welcome to the Family! 🎉</h2>
            
            <p style="font-size:16px; line-height:24px; color:#555555;">
                Hello there, <br><br>
                Your account has been successfully created! We're thrilled to have you join ${process.env.SITE_NAME}. Now you're all set to explore the world with the best deals and seamless bookings.
            </p>

            <div style="background-color:#f4f7ff; border-radius:8px; padding:20px; margin:25px 0; text-align: left;">
                <p style="margin:0 0 10px 0; font-weight:bold; color:#0b3d91;">With your new account, you can:</p>
                <ul style="margin:0; padding-left:20px; color:#555555; font-size:14px; line-height:20px;">
                    <li>Book flights & hotels in seconds</li>
                    <li>Track your travel history and invoices</li>
                    <li>Get exclusive "Member Only" discounts</li>
                </ul>
            </div>

            <p style="font-size:16px; line-height:24px; color:#555555;">
                Click the button below to log in and start planning your next big adventure!
            </p>

            <div style="text-align:center; margin:35px 0;">
                <a href="${process.env.SITE_URL}/login" style="display:inline-block; padding:14px 30px; background-color:#0b3d91; color:#ffffff; text-decoration:none; font-size:16px; border-radius:5px; font-weight:bold;">
                    Go to Dashboard
                </a>
            </div>

            <p style="font-size:14px; line-height:22px; color:#777777; border-top:1px solid #eeeeee; padding-top:20px;">
                If you didn't sign up for this account, please ignore this email or contact our support team.
            </p>

            <p style="font-size:16px; margin-top:30px;">
                Happy Travels,<br>
                <strong style="color:#0b3d91;">Team ${process.env.SITE_NAME}</strong>
            </p>
        </td>
    </tr>

    <tr>
        <td style="background-color:#0b3d91; padding:15px; text-align:center;">
            <p style="color:#ffffff; font-size:12px; margin:0;">
                © 2026 ${process.env.SITE_NAME}. Your Trusted Travel Partner.
            </p>
        </td>
    </tr>
`
                        }, (error) => {
                            if (error)
                                console.log(error)
                        })

                    } catch (error) {
                        let arr = []
                        if (error?.keyValue)
                            arr = Object.keys(error.keyValue).map(key => [key, `${key} Already Taken`])
                        else
                            arr = Object.keys(error?.errors).map(key => [key, error.errors[key].message])
                        let errorMessage = Object.fromEntries(arr)

                        res.status(Object.values(errorMessage).length ? 400 : 500).send({
                            result: "Fail",
                            message: Object.values(errorMessage).length ? errorMessage : "Internal Server Error"
                        })
                    }
                }
            })
        }
        else {
            res.status(400).send({
                result: "Fail",
                message: schema.validate(req.body.password, { details: true }).map(x => x.message.replaceAll("string", "Password"))
            })
        }
    }
    else {
        res.send({
            result: "Fail",
            message: "Password Field is Mendatory"
        })
    }
}




export async function getRecord(req, res) {
    try {
        let data = await User.find()
        res.send({
            result: "Done",
            count: data.length,
            data: data
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
}


export async function getSingleRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            // console.log(data);
            res.send({
                result: "Done",
                data: data
            })
        }
        else {
            console.log(data)
            res.send({
                result: "Fail",
                message: "Result Not Found"
            })
        }

    } catch (error) {
        // console.log(error);
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }

}

export async function updateRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.email = req.body.email ?? data.email
            data.phone = req.body.phone ?? data.phone
            data.userName = req.body.userName ?? data.userName
            data.role = req.body.role ?? data.role

            if (req.body.oldPassword || req.body.newPassword) {
                if (!req.body.oldPassword || !req.body.newPassword) {
                    return res.status(400).send({
                        result: "Fail",
                        message: "Old password and new password both required"
                    })
                }

                const isMatch = await bcrypt.compare(req.body.oldPassword, data.password)

                if (!isMatch) {
                    return res.status(400).send({
                        result: "Fail",
                        message: "Old Password Is Incorrect"
                    })
                }

                if (!schema.validate(req.body.newPassword)) {
                    return res.status(500).send({
                        result: "Fail",
                        message: schema
                            .validate(req.body.newPassword, { details: true })
                            .map(x => x.message.replaceAll("string", "Password"))
                            .join(", ")
                    })
                }

                const hash = await bcrypt.hash(req.body.newPassword, 12)
                data.password = hash
            }

            await data.save()
            res.status(200).send({
                reasult: "Done",
                data: data
            })
        }
        else {
            res.status(404).send({
                result: "Fail",
                message: "Result Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
}

export async function deleteRecord(req, res) {
    try {
        let data = await User.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.send({
                reault: "Done",
                data: data
            })
        }
        else {
            // console.log(data);
            res.status(404).send({
                result: "Fail",
                message: "Result Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            reasult: "Fail",
            message: "Internal Server Error"
        })
    }
}


export async function login(req, res) {
    try {
        let data = await User.findOne({
            email: req.body.email
        })
        if (data && await bcrypt.compare(req.body.password, data.password)) {
            let key = data.role === "user" ? process.env.JWT_SECRET_KEY : process.env.JWT_SECRET_KEY
            jwt.sign({ data }, key, { expiresIn: "15 days" }, (error, token) => {
                if (error) {
                    // console.log(error);
                    res.status(500).send({
                        result: "Fail",
                        message: "Internal Server Error"
                    })
                }
                else {
                    // console.log("USER:", data);
                    res.status(200).send({
                        result: "Done",
                        data: data,
                        token: token
                    })
                }
            })
        }
        else {
            res.status(401).send({
                result: "Fail",
                message: "Invalid UserName or Password"
            })
        }
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
}



export async function forgetPassword1(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { userName: req.body.userName },
                { email: req.body.email }
            ]
        })

        if (data) {
            let otp = Math.random().toString().slice(2, 8)
            data.otpAuthObject = {
                otp: otp,
                createdAt: new Date()
            }
            await data.save()

            res.send({
                result: "Done",
                message: "OTP Has Been Sent On Your Registered Email Address"
            })
            mailer.sendMail({
                from: process.env.MAILER,
                to: data.email,
                subject: `Password Reset OTP : Team ${process.env.SITE_NAME}`,
                html: `
        <tr>
        <td style="background-color:#0b3d91; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:24px;">🔐 ${process.env.SITE_NAME}</h1>
        </td>
        </tr>

        <tr>
        <td style="padding:30px; color:#333333;">
            <h2 style="color:#0b3d91; margin-top:0;">Reset Your Password</h2>
            
            <p style="font-size:16px; line-height:24px; margin:15px 0;">
            We received a request to reset your account password. Use the One-Time Password (OTP) below to proceed.
            </p>

            <!-- OTP Box -->
            <div style="text-align:center; margin:30px 0;">
            <span style="display:inline-block; padding:15px 30px; background-color:#0b3d91; color:#ffffff; font-size:26px; letter-spacing:6px; font-weight:bold; border-radius:6px;">
                ${otp}
            </span>
            </div>

            <p style="font-size:14px; line-height:22px; margin:15px 0; color:#555555;">
            This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone for security messages.
            </p>

            <p style="font-size:14px; line-height:22px; margin:15px 0; color:#555555;">
            If you did not request a password reset, you can safely ignore this email. Your account will remain secure.
            </p>

            <p style="font-size:16px; margin-top:30px;">
            Stay secure 🔒<br>
            <strong style="color:#0b3d91;">Team ${process.env.SITE_NAME}</strong>
            </p>
        </td>
        </tr>

        <tr>
        <td style="background-color:#0b3d91; padding:15px; text-align:center;">
            <p style="color:#ffffff; font-size:12px; margin:0;">
            © 2026 ${process.env.SITE_NAME}. All Rights Reserved.
            </p>
        </td>
        </tr>
    `
            }, (error) => {
                if (error) console.log(error);
            });
        }
        else {
            res.status(401).send({
                result: "Fail",
                message: "Record Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
}


export async function forgetPassword2(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { userName: req.body.userName },
                { email: req.body.email }
            ]
        })
        if (data) {
            const isExpired = (new Date() - new Date(data.otpAuthObject.createdAt)) > 120000
            if (isExpired) {
                return res.status(400).send({
                    result: "Fail",
                    result: "OTP Has Been Expired"
                })
            }

            if (data.otpAuthObject.otp !== req.body.otp) {
                return res.status(400).send({
                    result: "Fail",
                    message: "Invalid OTP"
                })
            }
            return res.send({
                result: "Done"
            })
        }
        else {
            return res.status(401).send({
                result: "Fail",
                message: "Unauthorized Activity"
            })
        }
    } catch (error) {
        return res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
}


export async function forgetPassword3(req, res) {
    try {
        let data = await User.findOne({
            $or: [
                { userName: req.body.userName },
                { email: req.body.email }
            ]
        })
        if (data) {
            if (schema.validate(req.body.password)) {
                await bcrypt.hash(req.body.password, 12, async (error, hash) => {
                    if (error) {
                        res.status(500).send({
                            result: "Fail",
                            message: "Internal Server Error During Password Encryptions"
                        })
                    }
                    else {
                        data.password = hash
                        await data.save()
                        res.send({
                            result: "Done",
                            data: data,
                            message: "Your Password Has Been Reset SuccessFully"
                        })

                    }
                })
            }
            else {
                res.status(400).send({
                    result: "Fail",
                    message: schema.validate(req.body.password, { details: true }).map(x => x.message.replaceAll("string", "password"))
                })
            }
        }
        else {
            res.status(401).send({
                result: "Fail",
                message: "UnAuthorized Activity"
            })
        }
    } catch (error) {
        res.status(500).send({
            result: "Fail",
            message: "Internal Server Error"
        })
    }
}