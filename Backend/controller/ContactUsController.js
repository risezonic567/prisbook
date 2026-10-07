import ContactUs from "../models/ContactUsModels.js";
import mailer from "../mailer/index.js"

export async function createRecord(req, res) {
    try {
        const data = new ContactUs(req.body)
        await data.save()

        res.status(200).send({
            reason: "Done",
            data: data,

        })

        mailer.sendMail({
            from: process.env.MAILER,
            to: data.email,
            subject: `Your Flight Inquiry is Confirmed: ${process.env.SITE_NAME}`,
            html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <!-- Header with Flight Icon/Theme -->
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#1a73e8; background-image: linear-gradient(to right, #1a73e8, #0d47a1);">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <div style="font-size: 40px; margin-bottom: 10px;">✈️</div>
                        <h1 style="color:#ffffff; margin:0; font-size:26px; letter-spacing: 1px;">${process.env.SITE_NAME}</h1>
                        <p style="color:#e3f2fd; margin: 5px 0 0 0; font-size: 14px;">Ready for Takeoff</p>
                    </td>
                </tr>
            </table>

            <!-- Main Body -->
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#ffffff;">
                <tr>
                    <td style="padding:40px 30px; color:#333333;">
                        <h2 style="color:#1a73e8; margin-top:0; font-size: 22px;">Safe Travels Start Here!</h2>
                        
                        <p style="font-size:16px; line-height:24px; color: #5f6368;">
                            Hello, <br><br>
                            We've received your flight-related query. Our travel experts are currently searching for the best routes and fares for you. You'll hear from us shortly with your personalized itinerary.
                        </p>

                        <!-- Call to Action -->
                        <div style="text-align:center; margin:35px 0;">
                            <a href="${process.env.SITE_URL}" style="display:inline-block; padding:14px 30px; background-color:#ff6d00; color:#ffffff; text-decoration:none; font-weight: bold; font-size:16px; border-radius:50px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                Check Flight Status
                            </a>
                        </div>

                        <div style="background-color: #f8f9fa; border-left: 4px solid #1a73e8; padding: 15px; margin-bottom: 20px;">
                            <p style="font-size:14px; margin:0; color: #555;">
                                <strong>Note:</strong> If you are looking for urgent rescheduling or cancellation, please keep your reference ID ready when you reply to this mail.
                            </p>
                        </div>

                        <p style="font-size:16px; margin-top:30px; border-top: 1px solid #eee; padding-top: 20px;">
                            Warm Regards,<br>
                            <strong style="color:#1a73e8;">${process.env.SITE_NAME} Concierge Team</strong>
                        </p>
                    </td>
                </tr>
            </table>

            <!-- Footer -->
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f3f4; border-top: 1px solid #e0e0e0;">
                <tr>
                    <td style="padding:20px; text-align:center;">
                        <p style="color:#70757a; font-size:12px; margin:0;">
                            © 2026 ${process.env.SITE_NAME} Airlines. All Rights Reserved. <br>
                            You received this email because you made an inquiry on our travel portal.
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    `
        }, (error) => {
            if (error) console.log(error);
        });

        mailer.sendMail({
            from: process.env.MAILER,
            to: process.env.MAILER,
            subject: `✈️ New Flight Query Alert: ${data.name} | ${process.env.SITE_NAME}`,
            html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Admin Header -->
            <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#0b3d91; padding: 25px; text-align: center;">
                <tr>
                    <td>
                        <h1 style="color:#ffffff; margin:0; font-size:20px; text-transform: uppercase; letter-spacing: 2px;">New Inquiry Received</h1>
                        <p style="color:#a9cce3; margin: 5px 0 0 0; font-size: 13px;">Portal Notification: ${process.env.SITE_NAME}</p>
                    </td>
                </tr>
            </table>

            <!-- Content Body -->
            <table width="100%" cellspacing="0" cellpadding="0" style="padding: 30px; background-color: #ffffff;">
                <tr>
                    <td>
                        <p style="font-size:16px; color:#333; margin-bottom: 25px;">
                            You have a new customer inquiry regarding <strong>${data.subject || 'Flight Booking'}</strong>.
                        </p>

                        <!-- Data Card -->
                        <div style="background-color:#f8fbff; border: 1px solid #d1e3f8; border-radius: 8px; padding: 20px;">
                            <h3 style="color:#0b3d91; margin-top:0; border-bottom: 1px solid #d1e3f8; padding-bottom: 10px; font-size: 16px;">Passenger / Lead Details</h3>
                            
                            <table width="100%" style="font-size: 14px; color: #444; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #777; width: 100px;">Name:</td>
                                    <td style="padding: 8px 0; font-weight: bold; color: #111;">${data.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #777;">Email:</td>
                                    <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #0b3d91; text-decoration: none; font-weight: bold;">${data.email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #777;">Phone:</td>
                                    <td style="padding: 8px 0; font-weight: bold;">${data.phone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #777;">Subject:</td>
                                    <td style="padding: 8px 0; font-weight: bold;">${data.subject}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #777; vertical-align: top;">Message:</td>
                                    <td style="padding: 8px 0; font-style: italic; line-height: 1.5;">"${data.message}"</td>
                                </tr>
                            </table>
                        </div>

                        <!-- Footer Info -->
                        <table width="100%" style="margin-top: 25px;">
                            <tr>
                                <td style="font-size: 12px; color: #888;">
                                    <strong>Submitted On:</strong> ${data.createdAt}<br>
                                    <strong>Source:</strong> Website Contact Form
                                </td>
                                <td style="text-align: right;">
                                    <a href="mailto:${data.email}" style="background-color: #0b3d91; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">Reply</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <!-- System Footer -->
            <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 11px; color: #999;">
                This is an automated system alert from ${process.env.SITE_NAME}. Please do not delete this record.
            </div>
        </div>
    `
        }, (error) => {
            if (error) console.log(error);
        });
    } catch (error) {
        let errorMessage = Object.fromEntries(Object.keys(error?.errors).map(key => [key, error.errors[key].message]))
        res.status(Object.values(errorMessage).length ? 400 : 500).send({
            result: "Fail",
            reason: Object.values(errorMessage).length ? errorMessage : "Internal Server Error"
        })
    }
}