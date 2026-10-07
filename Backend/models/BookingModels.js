import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    offerId: {
      type: String,
      required: true,
    },

    flightData: {
      airline: String,
      from: String,
      to: String,
      departureTime: String,
      arrivalTime: String,
      price: Number,
      currency: String,
    },

    passengers: [
      {
        name: String,
        age: Number,   
        gender: String,
      },
    ],

    contact: {
      email: String,
      phone: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    pnr: {
      type: String,
      unique: true,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },

    transactionId: {
      type: String,
      default: null,
    },

    paymentGateway: {
      type: String,
      default: "bridgerpay",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema)