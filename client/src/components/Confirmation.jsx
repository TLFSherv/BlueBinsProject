import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { BookingContext } from "../store/BookingProvider"
import useDatabase from "../hooks/useDatabase";

const Confirmation = () => {
    const { bookingStatus, Status, changeBookingStatus } = useContext(BookingContext);
    return (
        <>
            {bookingStatus === Status.SUCCESS ?
                <BookingSuccess />
                : <BookingFail Status={Status}
                    changeBookingStatus={changeBookingStatus} />
            }
        </>
    )
}

const BookingSuccess = () => {
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const { data, loading, error, post } = useDatabase()
    const submitHandler = async (e) => {
        e.preventDefault();
        const bookingId = localStorage.getItem('bookingId');
        try {
            const newUser = { bookingId: bookingId, email: email }
            const result = await post('http://localhost:2000/bookings/users', newUser)
            console.log(result)
            if (result.success) {
                setEmailSent(true)
                localStorage.removeItem('bookingId');
            }

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="w-full max-w-5xl grid gap-6 font-[Lato]">
            <h1 className="font-[Cal_Sans] text-[#0560F2] tracking-wide sm:tracking-wider text-[52px] text-center sm:text-[60px] md:text-[68px] lg:text-[78px]">
                Booking Success
            </h1>
            <div className="grid gap-10 px-8 mx-auto max-w-[700px] sm:text-lg">
                {/* If email not added succssfully tell user */}
                {emailSent ?
                    data?.success ? <p> {data.message} </p> : <p>{error}</p>
                    :
                    <p>
                        If you would like to make changes to your booking
                        in the future please enter your email below, if
                        not <a className="text-[#0055FF] font-bold hover:underline" href="/">return home</a>:
                    </p>
                }
                {emailSent ?
                    <Link to="/">
                        <button type="button"
                            className="mx-auto h-[54px] w-full text-lg sm:text-xl bg-[#0560F2]"
                        >Return home</button>
                    </Link>
                    : <form className="grid gap-8 w-full" onSubmit={submitHandler}>
                        <label>Email:
                            <input type="email"
                                value={email}
                                className="bg-white rounded-md border-2 border-[#468CF7] h-[36px] w-[80%] p-4 ml-1 sm:ml-2"
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <button type="submit"
                            className="mx-auto h-[54px] w-full text-lg sm:text-xl bg-[#0560F2]"
                            disabled={loading}>Submit</button>
                    </form>
                }
                <p className="text-center sm:text-lg px-4">Thank you for recycling, by <span className="underline">choosing</span> to recycle you’re contributing to a brighter future for Bermuda.</p>
                <img className="mx-auto" src="src/assets/images/Bermuda.png" alt="Bermuda" />
            </div>
        </div>
    )
}

const BookingFail = ({ Status, changeBookingStatus }) => {
    return (
        <div className="w-full max-w-5xl grid gap-12 font-[Lato]">
            <h1 className="font-[Cal_Sans] text-[#0F2B57] tracking-wide sm:tracking-wider text-[54px] text-center sm:text-[60px] md:text-[68px] lg:text-[78px]">
                Booking Fail
            </h1>
            <div className="grid gap-12 sm:gap-14 mx-auto px-8">
                <p className="text-lg md:text-xl lg:text-2xl font-[Lato]">Sorry there was an issue with the processing of your booking please try again.</p>
                <Link to="/booking">
                    <button
                        form="emailForm"
                        className="w-full h-[56px] sm:h-[64px] text-lg font-light sm:text-2xl bg-[#020297]"
                        onClick={() => changeBookingStatus(Status.PENDING)}
                    >Try again</button>
                </Link>
            </div>
        </div>
    )
}

export default Confirmation
