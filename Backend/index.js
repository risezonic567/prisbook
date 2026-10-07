import dotenv from 'dotenv'
import DBconnect from './db-connect.js'
import express from 'express'
import cors from 'cors'

dotenv.config()
DBconnect()

import Router from './routes/Store.js'

const app = express()

// app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: (origin, callback) => {
    console.log("CORS Origin:", origin);

    const allowedOrigins = [
      "http://localhost:5173",
      "https://kradtravel.com",
      "https://www.kradtravel.com"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true
}));

app.use(express.json())

app.use("/api",Router)


const port = process.env.PORT || 3300  

app.listen(port,console.log( `Server IS started at http://localhost:${port}`))