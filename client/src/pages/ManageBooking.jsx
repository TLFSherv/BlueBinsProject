import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import useDatabase from "../hooks/useDatabase";
import AccordionForm from "../components/AccordionForm";

const ManageBooking = () => {
    const headerNav = [{ link: "/", page: "Home" },
    { link: "/contact", page: "Contact us" }]
    const [isOpen, setIsOpen] = useState([])
    const [userBookings, setUserBookings] = useState(null)
    const { get } = useDatabase();

    useEffect(() => {
        const getBookingData = async () => {
            const result = await get("http://localhost:2000/bookings/manage");
            setUserBookings(result.data.bookings);
            setIsOpen(Array(result.results).fill(false))
        }
        getBookingData()
        //return async () => await get("logout")
    }, [])

    const clickHandler = (i) => {
        isOpen[i] = !isOpen[i];
        setIsOpen([...isOpen])
    }

    return (
        <>
            <Header headerNav={headerNav} />
            <main className="flex-1 flex flex-col gap-8 mx-auto">
                <h1 className="mt-12 font-[Cal_Sans] text-[#0055FF] text-center tracking-wide sm:tracking-wider text-[48px] sm:text-[60px] md:text-[70px]">
                    Manage Booking
                </h1>
                <div className="relative inline-block mx-4 max-w-[800px]">
                    <h2 className="mb-6">
                        Please click on the booking id to expand the details. We do not keep your data past the date of the booking.
                    </h2>
                    <div className="sticky w-full border-2 rounded-xl border-white divide-y divide-white font-[Lato] bg-[#DDE4F1]">
                        {userBookings &&
                            userBookings.map((booking, i) => {
                                return (
                                    <div key={i} className="p-[2px]">
                                        <h2 onClick={() => clickHandler(i)}
                                            className={`cursor-pointer text-lg p-3 rounded ${isOpen[i] ? "text-white bg-[#468CF7]" : "bg-[#DDE4F1] "}`}>
                                            <span className="text-base font-light tracking-wide">Booking</span> {booking?.id}
                                        </h2>
                                        {isOpen[i] && <AccordionForm
                                            setUserBookings={setUserBookings}
                                            userBookings={userBookings}
                                            index={i} />
                                        }
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </main >
        </>
    )

}



export default ManageBooking