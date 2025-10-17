import { useState } from "react";
import { Link } from 'react-router-dom';
import useDatabase from "../hooks/useDatabase";
import Header from "../components/Header"
import bda from "../assets/images/Bermuda.png"
import useValidate from "../hooks/useValidate";

const BookingSuccess = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { isValid, isValidEmail } = useValidate()
    const { data, loading, error, post } = useDatabase()
    const headerNav = [{ link: "/", page: "Home" },
    { link: "/contact", page: "Contact us" }]

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email))
            return

        const bookingId = localStorage.getItem('bookingId');
        setIsSubmitted(true)
        try {
            const newUser = { bookingId: bookingId, email: email }
            const result = await post('http://localhost:2000/bookings/users', newUser)
            localStorage.removeItem('bookingId');

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Header headerNav={headerNav} />
            <main className="flex-1 flex flex-col justify-center max-w-2xl mx-auto">
                <div className="w-full max-w-5xl flex flex-col space-y-6 font-[Lato]">
                    <h1 className="font-[Cal_Sans] text-[#0560F2] tracking-wide sm:tracking-wider text-[52px] text-center sm:text-[60px] md:text-[68px]">
                        Booking Success
                    </h1>
                    <div className="flex flex-col space-y-10 px-8 mx-auto max-w-[700px] sm:text-lg">
                        {isSubmitted ?
                            <Buttons data={data} error={error} />
                            : <EmailForm
                                email={email}
                                setEmail={setEmail}
                                isValid={isValid}
                                loading={loading}
                                error={error}
                                submitHandler={submitHandler}
                            />
                        }
                        <p className="text-center sm:text-lg px-4">Thank you for recycling, by <span className="underline">choosing</span> to recycle you’re contributing to a brighter future for Bermuda.</p>
                        <img className="mx-auto" srcSet={bda} alt="Bermuda" />
                    </div>
                </div>
            </main>
        </>
    )
}

const Buttons = (props) => {
    const { data, error } = props
    return (
        <div>
            <p className={`text-center text-xl py-2 
                        ${data?.success ?
                    "font-[Playwrite_US_Trad] font-light" :
                    "text-red-400"}`}>
                {data?.success ? data?.message : error}
            </p>
            <Link to="/">
                <button type="button"
                    className="mx-auto h-[54px] w-full text-lg sm:text-xl bg-[#0560F2]"
                >Home</button>
            </Link>
        </div>
    )
}

const EmailForm = (props) => {
    const { email, loading, isValid,
        setEmail, submitHandler } = props
    return (
        <div className="flex flex-col space-y-6">
            <p>
                If you would like to make changes to your booking
                in the future please enter your email below, if
                not <a className="text-[#0055FF] font-bold hover:underline" href="/">return home</a>:
            </p>
            <form className="flex flex-col space-y-8 w-full" onSubmit={submitHandler}>
                <div className="flex flex-row space-x-4">
                    <label>Email:</label>
                    <div className="w-full">
                        <input type="email"
                            value={email}
                            className="bg-white rounded-md border-2 border-[#468CF7] h-[36px] p-4 w-full"
                            onChange={(e) => setEmail(e.target.value)} />
                        {isValid || <p className="w-full text-red-400 text-sm place-self-end pt-1">Invalid email</p>}
                    </div>
                </div>
                <button type="submit"
                    className="mx-auto h-[54px] w-full text-lg sm:text-xl bg-[#0560F2]"
                    disabled={loading}>Submit</button>
            </form>
        </div>
    )
}


export default BookingSuccess



