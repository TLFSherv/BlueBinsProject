import { useState } from "react"
import { BookingAddress } from "./BookingAddress"
import { BookingQuantity } from "./BookingQuantity"
import { BookingDate } from "./BookingDate"
import { BookingReview } from "./BookingReview"
import FormButtons from "../components/FormButtons"
import NavBar from "../components/NavBar"


export const BookingForm = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [error, setError] = useState("")
    const components = [
        <BookingAddress error={error} />,
        <BookingQuantity />,
        <BookingDate error={error} />,
        <BookingReview error={error} />
    ]
    return (
        <div className="w-full max-w-5xl p-2 rounded-[16px] bg-linear-[#69B9FF,#A83CFA,#4554FD]">
            <h1 className="font-[Cal_Sans] sm:tracking-wide py-2 text-[40px] text-center sm:text-[48px] md:text-[56px]">
                Collection Booking
            </h1>
            <div className="grid grid-cols-1 gap-4 py-[24px] md:grid-cols-2 rounded-[8px] bg-[#F3F6FB]">
                <NavBar activeIndex={activeIndex} />
                <form >
                    {components[activeIndex]}
                    <FormButtons
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        setError={setError} />
                </form>

            </div>
        </div>

    )
}

