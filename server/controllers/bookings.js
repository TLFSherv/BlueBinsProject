const db = require("../db")

const createBooking = async (req, res, next) => {
    const dateCreated = new Date().toLocaleString()
    let location;
    try {
        const address = req.body.address
        if (!req.locationExists) {
            location = await db.query(
                `INSERT INTO locations 
                (id,formattedAddress,parish,route,streetNumber,latitude,longitude,distanceMeters)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8) 
                RETURNING id;`,
                [address.id, address.formattedAddress,
                address.parish, address.route,
                address.streetNumber, address.latitude,
                address.longitude, address.distanceMeters])
        }
        const booking = await db.query(
            `INSERT INTO bookings
            (locationid,details,collectionDate,quantity,dateCreated)
            VALUES($1,$2,$3,$4,$5) 
            RETURNING id;`,
            [address.id, req.body.additionalInfo,
            req.body.date, req.body.quantity, dateCreated]
        )
        // store data for logging
        req.bookings = booking.rows[0].id
        req.locations = location?.rows[0].id
        res.status(200).json({
            success: true,
            data: booking.rows[0]
        })
        next()
    } catch (error) {
        console.error(error)
    }
}

const getBooking = async (req, res, next) => {
    const sql =
        `select b.*, l.formattedAddress 
        from bookings b left join 
        locations l on b.locationId = l.id 
        left join users u on b.id=u.bookingId 
        where u.email=$1 order by b.collectiondate;`;
    try {
        const results = await db.query(sql, [req.user.email])
        res.status(200).json({
            success: true,
            results: results.rows.length,
            data: { bookings: results.rows }
        })
    } catch (error) {
        console.error(error)
    }
}

const updateBooking = async (req, res, next) => {
    const dateModified = new Date().toLocaleString()
    const sql =
        `update bookings as b set details=$1,
        collectionDate=$2, quantity=$3, dateModified=$4 
        from users as u, locations as l
        where b.id=u.bookingId 
        and l.id=b.locationId 
        and u.email=$5 
        and b.id=$6 
        returning b.*, l.formattedAddress;`

    try {
        const booking = await db.query(sql,
            [req.body.details, req.body.collectiondate,
            req.body.quantity, dateModified, req.user.email,
            req.body.id]
        )

        if (booking.rowCount === 0)
            return res.status(400).send({
                success: false,
                message: 'failed update'
            })

        req.bookings = booking.rows[0].id
        res.status(200).send({
            success: true,
            message: `${booking.rows[0].id} updated`,
            results: booking.rows.length,
            data: { booking: booking.rows }
        })
        next()
    } catch (error) {
        console.error(error)
    }
}

const accessBooking = async (req, res) => {
    try {
        const email = await db.query(
            "SELECT email FROM users WHERE email=$1;",
            [req.body.email])

        if (email.rowCount === 0)
            return res.status(401).send({
                success: false,
                message: "Login fail"
            });

        req.session.user = email.rows[0]
        res.status(200).json({
            success: true,
            message: "Login success"
        })
    } catch (error) {
        console.error(error)
    }
}

const deleteBooking = async (req, res, next) => {
    const sql =
        `delete from bookings b 
        using users u 
        where b.id=u.bookingId and
        email=$1 and b.id=$2 returning u.id;`

    try {
        const result = await db.query(sql, [req.user.email, req.body.id])
        if (result.rowCount === 0)
            return res.status(400).json({
                success: false,
                message: 'delete fail'
            })

        const user = await db.query("delete from users \
            where id=$1 returning bookingId;",
            [result.rows[0].id])

        res.status(200).json({
            success: true,
            message: `booking ${user.rows[0].bookingId} deleted`
        })
        next()
    } catch (error) {

    }
}

module.exports = {
    createBooking,
    accessBooking,
    getBooking,
    updateBooking,
    deleteBooking
}