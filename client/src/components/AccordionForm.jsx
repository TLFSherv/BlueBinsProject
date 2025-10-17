import React, { useState, memo } from "react"
import useDatabase from "../hooks/useDatabase"

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const m = date.getMonth() + 1;
    const mm = m < 10 ? `0${m}` : m;

    const d = date.getDate();
    const dd = d < 10 ? `0${d}` : d;

    return `${date.getFullYear()}-${mm}-${dd}`;
}

const initBooking = (data) => {
    return {
        ...data,
        collectiondate: formatDate(data.collectiondate),
    }
}
const AccordionForm = memo(({ userBookings, index, setUserBookings }) => {
    const [booking, setBooking] = useState(() => initBooking(userBookings[index]))
    const [enabled, setEnabled] = useState(false)
    const { loading, error, put, deleteReq } = useDatabase();
    const url = 'http://localhost:2000/bookings/manage';
    const date = new Date();
    const minDate = formatDate(date.setDate(date.getDate() + 1));
    const maxDate = formatDate(date.setDate(date.getDate() + 5));
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBooking({ ...booking, [name]: value })
    }
    const cancelChange = () => {
        setEnabled(false);
        setBooking(booking);
    }
    const saveChanges = async () => {
        const result = await put(url, booking);
        const newBooking = initBooking(result.data.booking[0]);
        userBookings[index] = newBooking;
        setUserBookings([...userBookings]);
        setEnabled(false);
    }
    const deleteBooking = async () => {
        await deleteReq(url, { id: booking.id });
        const remaining = userBookings.filter(b => b.id !== booking.id)
        setUserBookings([...remaining])
    }

    return (
        <form className="h-[400px] sm:h-[330px] overflow-y-auto">
            <p className="text-center text-red-400 pt-1">{error}</p>
            <div className="grid sm:grid-cols-[1fr_3fr] gap-2 m-4 sm:m-8">
                <label>Address: </label>
                <div>
                    <input
                        autoComplete="off"
                        value={booking.formattedaddress}
                        disabled
                        className="w-full h-[32px] p-4 bg-white rounded-md border-2 border-[#468CF7]" />
                    <p className="text-xs pt-1 tracking-wide">Address cannot be modified.</p>
                </div>
                <label className="block">Additonal info:</label>
                <textarea
                    name="details"
                    value={booking.details}
                    onChange={e => handleChange(e)}
                    disabled={!enabled}
                    className="p-2 h-[56px] max-h-[80px] bg-white rounded-md border-2 border-[#468CF7]" />
                <label>Date:</label>
                <input
                    name="collectiondate"
                    type="date"
                    value={booking.collectiondate}
                    min={minDate} max={maxDate}
                    onChange={e => handleChange(e)}
                    disabled={!enabled}
                    className="h-[32px] p-4 bg-white rounded-md border-2 border-[#468CF7]" />
                <label>Quantity:</label>
                <input
                    name="quantity"
                    type="number"
                    min={0} max={5}
                    value={booking.quantity}
                    onChange={e => handleChange(e)}
                    disabled={!enabled}
                    className="h-[32px] p-4 bg-white rounded-md border-2 border-[#468CF7]" />
            </div>
            <div className="flex flex-col sm:flex-row m-4 gap-2">
                <div className="flex-1 flex gap-4 sm:gap-6">
                    {enabled ?
                        <button
                            type="button"
                            onClick={saveChanges}
                            disabled={loading}
                            className="h-[40px] sm:h-[48px] p-2 w-[116px] sm:text-xl bg-[#468CF7]">
                            Save
                        </button>
                        : <button
                            type="button"
                            onClick={() => setEnabled(true)}
                            className="h-[40px] sm:h-[48px] p-2 w-[116px] sm:text-xl bg-[#468CF7] ">
                            Edit
                        </button>
                    }
                    <button
                        type="button"
                        onClick={cancelChange}
                        className="h-[40px] sm:h-[48px] p-2 w-[116px] sm:text-xl bg-[#468CF7]">
                        Cancel
                    </button>
                </div>
                <button
                    type="button"
                    disabled={loading}
                    onClick={deleteBooking}
                    className="h-[40px] sm:h-[48px] p-2 w-[116px] sm:text-xl bg-[#468CF7] ">
                    Delete
                </button>
            </div>
        </form>
    )
})

export default AccordionForm