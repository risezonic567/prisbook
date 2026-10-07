import express from 'express'
import { fetchFlights, searchLocation, getFlightById } from '../controller/FlightController.js'
const FlightRouter= express.Router()

FlightRouter.post("/flight-search",fetchFlights)
FlightRouter.get("/flight/:id",getFlightById)
FlightRouter.get("/airports",searchLocation)

export default FlightRouter