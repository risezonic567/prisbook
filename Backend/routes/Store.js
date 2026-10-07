import express from 'express'

const Router = express.Router()
import UserRouter from './UserRoute.js'
import FlightRouter from './FlightRoutes.js'
import ContactusRouter from './ContactUsRoute.js'
import BookingRouter from './BookingRoute.js'
import PaymentRouter from './PaymentRoute.js'

Router.use("/user",UserRouter)
Router.use("/flight",FlightRouter)
Router.use("/contactus", ContactusRouter)
Router.use("/checkout", BookingRouter)
Router.use("/payment", PaymentRouter)




// Router.use("/flight",)

export default Router