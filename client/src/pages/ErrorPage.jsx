import { Link } from 'react-router-dom';
import Header from "../components/Header"

const BookingError = () => {
    const headerNav = [{ link: "/", page: "Home" },
    { link: "/contact", page: "Contact us" }]
    return (
        <>
            <Header headerNav={headerNav} />
            <main className="flex-1 flex flex-col justify-center max-w-xl mx-auto">
                <div className="w-full max-w-5xl grid gap-12 font-[Lato]">
                    <h1 className="font-[Cal_Sans] text-[#0F2B57] tracking-wide sm:tracking-wider text-[54px] text-center sm:text-[60px] md:text-[68px] lg:text-[78px]">
                        Booking Fail
                    </h1>
                    <div className="grid gap-12 sm:gap-14 mx-auto px-8">
                        <p className="text-lg md:text-xl lg:text-2xl font-[Lato]">Sorry there was an issue with the processing of your booking please try again.</p>
                        <Link to="/booking">
                            <button
                                className="w-full h-[56px] sm:h-[64px] text-lg font-light sm:text-2xl bg-[#020297]">
                                Try again</button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BookingError