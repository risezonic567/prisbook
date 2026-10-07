import Booking from "../models/BookingModels.js";
import dotenv from "dotenv"
dotenv.config()

const getAccessToken = async () => {
  try {
    const response = await fetch(
      "https://api.bridgerpay.com/v2/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: process.env.BRIDGERPAY_USERNAME,
          password: process.env.BRIDGERPAY_PASSWORD,
        }),
      }
    );

    const text = await response.text();

    // console.log("========== LOGIN API ==========");
    // console.log("STATUS:", response.status);
    // console.log("RAW RESPONSE:", text);

    let data = {};

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log("JSON parse failed");
    }

    // console.log("LOGIN RESPONSE:", data);

    // IMPORTANT FIX

    const token =
      data?.result?.access_token?.token;

    if (!token) {
      throw new Error(
        "BridgerPay login failed. No access token received."
      );
    }

    return token;

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    throw error;
  }
};

export const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // const booking = await Booking.findById(bookingId);

    const booking = await Booking.findOne({
  _id: bookingId,
  user: req.user._id
});

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // GET ACCESS TOKEN

    const accessToken = await getAccessToken();

    // console.log("ACCESS TOKEN:", accessToken);

    // CREATE CASHIER SESSION

    const response = await fetch(
      `https://api.bridgerpay.com/v2/cashier/session/create/${process.env.BRIDGERPAY_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          cashier_key: process.env.BRIDGERPAY_CASHIER_KEY,

          order_id: booking._id.toString(),

          currency: "USD",

          amount: Number(booking.flightData.price),

          first_name:
            booking.passengers?.[0]?.name?.split(" ")[0] ||
            "Guest",

          last_name:
            booking.passengers?.[0]?.name?.split(" ")[1] ||
            "User",

          email: booking.contact?.email,

          phone: booking.contact?.phone,

          country: "AU",

          state: "NSW",

          city: "Sydney",

          address: "Street 1",

          zip_code: "10001",

          payment_method: "credit_card",

          mid_type: "moto"
        }),
      }
    );

    const text = await response.text();

    // console.log("========== SESSION API ==========");
    // console.log("STATUS:", response.status);
    // console.log("RAW RESPONSE:", text);

    let data = {};

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.log("JSON parse failed");
    }

    // console.log("SESSION RESPONSE:", data);

    // CASHIER TOKEN CHECK

   const cashierToken = data?.result?.cashier_token;

if (!cashierToken) {
  return res.status(500).json({
    message: "Token failed",
    status: response.status,
    raw: text,
    parsed: data,
  });
}

return res.json({
  cashier_token: cashierToken,
  cashier_key: process.env.BRIDGERPAY_CASHIER_KEY,
});
  } catch (error) {
    console.log("FULL PAYMENT ERROR:", error);

    return res.status(500).json({
      message: error.message || "Payment Error",
    });
  }
};


//Payments Webhook

export const paymentWebhook = async (req, res) => {
  try {
    const { order_id, status, transaction_id } = req.body;

    const booking = await Booking.findById(order_id);

    if (!booking) return res.sendStatus(404);

    if (status === "approved") {
      booking.paymentStatus = "CONFIRMED";
      booking.status = "CONFIRMED";
      booking.transactionId = transaction_id;
    }

    if (status === "declined") {
      booking.paymentStatus = "CANCELLED";
      booking.status = "CANCELLED";
    }

    await booking.save();

    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
};


export const paymentSuccess = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID required",
      });
    }

   const updatedBooking = await Booking.findOneAndUpdate(
  {
    _id: bookingId,
    user: req.user._id
  },
  {
    paymentStatus: "SUCCESS",
    status: "CONFIRMED",
    transactionId: "TXN_" + Date.now()
  },
  { new: true }
);

    res.status(200).json({
      success: true,
      message: "Payment success, booking confirmed",
      booking: updatedBooking,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};