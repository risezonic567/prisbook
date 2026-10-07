import Booking from "../models/BookingModels.js";
import mailer from "../mailer/index.js";

const generatePNR = async () => {
  let pnr;
  let exists = true;

  while (exists) {
    pnr = Math.random().toString(36).substring(2, 8).toUpperCase();
    exists = await Booking.findOne({ pnr });
  }

  return pnr;
};

export const flightBooking = async (req, res) => {
  try {
    const { offerId, passengers, contact, flightData, guestId } = req.body;

    const userId = req.user?._id 

    // console.log("USER ID:", userId);



    if (!offerId || !passengers?.length || !flightData) {
      return res.status(400).json({
        result: "Fail",
        message: "Missing required data",
      });
    }

   for (let i = 0; i < passengers.length; i++) {

  const passenger = passengers[i];

  // NAME REQUIRED
  if (!passenger.name?.trim()) {
    return res.status(400).json({
      field: `passengers.${i}.name`,
      message: `Passenger ${i + 1} name is required`,
    });
  }

  // NAME LENGTH
  if (passenger.name.trim().length < 2) {
    return res.status(400).json({
      field: `passengers.${i}.name`,
      message: `Passenger ${i + 1} name is too short`,
    });
  }

  // NAME VALIDATION
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(passenger.name)) {
    return res.status(400).json({
      field: `passengers.${i}.name`,
      message: `Passenger ${i + 1} name is invalid`,
    });
  }

  // AGE REQUIRED
  if (!passenger.age) {
    return res.status(400).json({
      field: `passengers.${i}.age`,
      message: `Passenger ${i + 1} age is required`,
    });
  }

  // AGE NUMBER
  if (isNaN(passenger.age)) {
    return res.status(400).json({
      field: `passengers.${i}.age`,
      message: `Passenger ${i + 1} age must be number`,
    });
  }

  // AGE LIMIT
  if (passenger.age < 0 || passenger.age > 120) {
    return res.status(400).json({
      field: `passengers.${i}.age`,
      message: `Passenger ${i + 1} age is invalid`,
    });
  }

  // GENDER VALIDATION
  const validGender = ["male", "female", "other"];

  if (!validGender.includes(passenger.gender?.toLowerCase())) {
    return res.status(400).json({
      field: `passengers.${i}.gender`,
      message: `Passenger ${i + 1} gender is invalid`,
    });
  }
}

    if (!contact?.email) {
      return res.status(400).json({
        result: "Fail",
        message: "Email is Required",
      });
    }

    if (!contact?.phone) {
      return res.status(400).json({
        result: "Fail",
        message: "Phone Number Is Mendatory"
      })
    }



    if (
      !flightData.airline ||
      !flightData.from ||
      !flightData.to ||
      !flightData.departureTime ||
      !flightData.arrivalTime ||
      !flightData.price
    ) {
      return res.status(400).json({
        result: "Fail",
        message: "Invalid flight data",
      });
    }

    const existingBooking = await Booking.findOne({
      user: userId,
      offerId,
      status: "PENDING",
    });

    if (existingBooking) {
      return res.status(400).json({
        result: "Fail",
        message: "Booking already in process",
      });
    }

    const totalPrice = passengers.length * flightData.price;

    const booking = await Booking.create({
      user: userId,
      offerId,
      flightData,
      passengers,
      contact,
      totalPrice,
      pnr: await generatePNR(),
      status: "PENDING",
      paymentStatus: "PENDING",
    });

    res.status(201).json({
      result: "Success",
      message: "Booking initiated",
      booking,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: "Fail",
      message: error.message,
    });
  }
};