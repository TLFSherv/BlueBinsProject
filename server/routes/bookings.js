const express = require('express')
const router = express.Router()
const {
    createBooking,
    accessBooking,
    getBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookings')

const auth = (req, res, next) => {
    const user = req.session.user
    if (!user) return res.status(401).send();

    try {
        req.user = user // {email: "email"}
        next()
    } catch (error) {
        res.status(401).send()
    }

}

const locationExists = async (req, res, next) => {
    const result = await db.query("SELECT 1 WHERE EXISTS \
        (SELECT 1 FROM locations WHERE id=$1);",
        [req.body.address.id])
    req.locationExists = result.rowCount !== 0;
    next()
}

router.post("/", locationExists, createBooking)

router.post("/access", accessBooking)

router.get("/manage", auth, getBooking)

router.put("/manage", auth, updateBooking)

router.delete("/manage", auth, deleteBooking)
//assign user to booking
router.post("/users", async (req, res) => {
    try {
        if (!req.body?.bookingId)
            return res.status(401).json({
                success: false,
                message: `Problem adding email ${req.body.email}`
            })

        const booking = await db.query(
            "SELECT id from bookings WHERE id=$1;",
            [req.body.bookingId]
        )

        if (booking.rowCount === 0)
            return res.status(401).json({
                success: false,
                message: `Problem adding email ${req.body.email}`
            })

        const user = await db.query(
            `INSERT INTO users(email,bookingId) VALUES($1,$2) 
            RETURNING email;`,
            [req.body.email, booking.rows[0].id]
        )
        res.status(200).json({ success: true, message: `Welcome ${user.rows[0].email}` })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router