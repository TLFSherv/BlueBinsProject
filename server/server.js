require("dotenv").config()
const express = require('express')
const bookings = require('./routes/bookings')
const session = require('express-session')
const writeToLog = require("./logger")

const app = express()
const db = require("./db")
const cors = require('cors')

//middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'blue',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 300000,
        httpOnly: true,
    }
}))

app.use((req, res, next) => {
    res.on("finish", async () => await writeToLog(req, res))
    next()
})

app.use('/bookings', bookings)

app.post("/contacts", async (req, res, next) => {
    const dateCreated = new Date().toLocaleString()
    try {
        const contact = await db.query(
            `INSERT INTO contacts(bookingId,email,message,dateCreated)
             VALUES($1,$2,$3,$4) 
             RETURNING contacts.id;`,
            [req.body.bookingId, req.body.email,
            req.body.message, dateCreated]
        )
        if (contact.rowCount === 0)
            return res.status(400).json({
                success: false,
                message: "Message not recieved"
            })

        req.contact = contact.rows[0].id
        res.status(200).json({
            success: true,
            message: "Message recieved"
        })
        next()
    } catch (err) {
        console.error(err)
    }
})

app.listen(2000, () => {
    console.log('Server is listening on port 2000')
})






