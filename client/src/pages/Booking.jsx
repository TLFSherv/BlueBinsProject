import Header from "../components/Header";
import { BookingForm } from "./BookingForm";
import { BookingProvider } from '../store/BookingProvider';

const Booking = () => {
    const headerNav = [{ link: "/contact", page: "Contact us" },
    { link: "/booking/access", page: "Manage booking" }]
    return (
        <BookingProvider>
            <Header headerNav={headerNav} />
            <main className='flex-1 flex flex-col justify-evenly items-center mx-2'>
                <BookingForm />
            </main >
        </BookingProvider>
    )
}


export default Booking