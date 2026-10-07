export const fetchFlights = async (req, res) => {
  try {
    const { origin, destination, date, returnDate, adults = 1, children = 0, infants = 0 } = req.body

    if (!origin || !destination || !date) {
      return res.status(400).send({
        result: "Fail",
        message: "Origin,Desination,Date Is Required"
      })
    }

    const slices = [
      {
        origin,
        destination,
        departure_date: date,
      },

    ]

    if (returnDate) {
      slices.push(
        {
          origin: destination,
          destination: origin,
          departure_date: returnDate,
        }
      )
    }

    const passengers = []

    for (let i = 0; i < adults; i++) {
      passengers.push({ type: "adult" })
    }

    for (let i = 0; i < children; i++) {
      passengers.push({ type: "child" })
    }

    for (let i = 0; i < infants; i++) {
      passengers.push({ type: "infant_without_seat" })
    }


    const response = await fetch("https://api.duffel.com/air/offer_requests", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLIGHT_SEARCH_TOKEN}`,
        "Content-Type": "application/json",
        "Duffel-Version": "v2"
      },
      body: JSON.stringify({
        data: {
          slices,
          passengers
        }
      })
    })


    const data = await response.json()

    const requestId = data?.data?.id;

    if (!requestId) {
      return res.status(500).send({
        message: "Failed to create offer request",
        error: data
      })
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    const offersRes = await fetch(
      `https://api.duffel.com/air/offer_requests/${requestId}?include=offers`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLIGHT_SEARCH_TOKEN}`,
          "Duffel-Version": "v2"
        }
      }
    )

    const offersData = await offersRes.json()

    const offers = offersData?.data?.offers || []

    res.send({
      success: true,
      total: offers.length,
      offers
    })

  } catch (error) {
    // console.log("ERROR:", error)
    res.status(500).send({
      success: false,
      message: "Error fetching flights"
    })
  }
};




export const getFlightById = async (req,res) =>{
  const encodedId = req.params.id

  const decodedId = Buffer.from(encodedId,"base64").toString('utf-8')

  try {
    const response = await fetch(`https://api.duffel.com/air/offers/${decodedId}`,{
      headers:{
        Authorization: `Bearer ${process.env.FLIGHT_SEARCH_TOKEN}`,
          "Duffel-Version": "v2"
      }
    })

    const data = await response.json()

    res.send({
      success: true,
      flight: data.data
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching flight by ID"
    })
  }
}

export let searchLocation = async (req, res) => {
  try {
    let { query } = req.query;

    let response = await fetch(
      `https://api.duffel.com/places/suggestions?query=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.FLIGHT_SEARCH_TOKEN}`,
          "Content-Type": "application/json",
          "Duffel-Version": "v2"
        }
      }
    );

    let result = await response.json();

    if (!response.ok) {
      return res.status(400).send({
        message: "Duffel API error",
        status: false,
        error: result
      });
    }

    return res.send({
      message: "Airport suggestions fetched successfully",
      status: true,
      data: result
    });


  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Location search error" })
  }
}