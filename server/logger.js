const { writeFile } = require('fs').promises

const writeToLog = async (req, res) => {
    const time = new Date().toLocaleString()
    let logInfo = ''
    try {
        if (req.contact)
            logInfo = `contact ${req.contact}`
        else if (req.bookings)
            logInfo = `booking ${req.bookings} ${req.locations ? "location " + req.locations : ""}`

        const result = await writeFile('./logs/log.txt',
            `date ${time} method ${req.method} url ${req.url} info ${logInfo} \n`,
            { flag: 'a' })
    } catch (error) {
        console.error(error)
    }

}

module.exports = writeToLog;