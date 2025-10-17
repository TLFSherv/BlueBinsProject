import Header from "../components/Header"
import { useState } from "react"
import useDatabase from "../hooks/useDatabase"
import useValidate from "../hooks/useValidate"

const AccessBooking = () => {
    const [email, setEmail] = useState("");
    const { isValid, isValidEmail } = useValidate();
    const { loading, error, post } = useDatabase();
    const headerNav = [{ link: "/", page: "Home" },
    { link: "/contact", page: "Contact us" }];

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email))
            return;

        try {
            const creds = { email: email };
            const result = await post('http://localhost:2000/bookings/access', creds);
            if (result?.success) {
                window.location = "/booking/manage";
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Header headerNav={headerNav} />
            <main className="flex-1 flex flex-col justify-center items-center">
                <div className="px-4 sm:w-[80%] max-w-[800px]">
                    <h1 className="font-[Cal_Sans] text-[#3C4CFA] text-center tracking-wide sm:tracking-wider text-[54px] md:text-[64px] lg:text-[72px]">
                        Access Booking
                    </h1>
                    <div className="flex flex-col space-y-8 text-base sm:text-lg my-8 mx-auto">
                        <p className="font-[Lato]">
                            Please enter your email to access your booking. Please note that we don't store booking data past the booking date.
                        </p>
                        <form id="accessForm" onSubmit={submitHandler}
                            className="flex flex-col space-x-4 sm:flex-row sm:justify-center sm:gap-3">
                            <label>Email:</label>
                            <div className="w-full">
                                <input type="text" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="bg-[#FFFFFF] rounded-md border-2 border-[#468CF7] h-[40px] w-full max-w-[600px] p-4" />
                                {
                                    (!isValid || error) &&
                                    <p className="pt-1 text-sm text-red-400">
                                        {!isValid ? "Invalid Email" : error}
                                    </p>
                                }
                            </div>

                        </form>
                        <button form="accessForm"
                            className="h-[56px] text-xl sm:text-2xl font-light bg-[#3C4CFA] w-full"
                            disabled={loading}>Submit</button>
                    </div>
                </div>
            </main>
        </>

    )
}

export default AccessBooking