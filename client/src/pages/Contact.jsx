import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import useDatabase from "../hooks/useDatabase";
import useValidate from "../hooks/useValidate";

const initContact = { bookingId: "", email: "", message: "" };
const Contact = () => {
    const [contact, setContact] = useState(initContact);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { isValid, isValidEmail } = useValidate()
    const { data, loading, error, post } = useDatabase();
    const headerNav = [{ link: "/", page: "Home" },
    { link: "/booking/access", page: "Manage booking" }]

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (!isValidEmail(contact.email))
            return

        try {
            const result = await post('http://localhost:2000/contacts', contact);
            if (result?.success)
                setIsSubmitted(true);
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Header headerNav={headerNav} />
            <main className="flex-1 flex flex-col justify-center max-w-2xl mx-auto">
                <div className="space-y-6 px-4 sm:px-6">
                    <h1 className="font-[Cal_Sans] text-[#3C4CFA] text-center sm:tracking-wide max-[400px]:text-[56px] text-[64px] sm:text-[68px] md:text-[70px] lg:text-[80px]">
                        Contact us
                    </h1>
                    <p className="text-medium sm:text-lg">
                        If you have a question about a past or future booking send us a message, and we’ll respond via email.
                    </p>
                    <form onSubmit={submitForm} className="space-y-6 text-medium sm:text-lg">
                        <div className="flex flex-col sm:flex-row gap-1">
                            <label className="sm:w-1/6">Booking id: <span className="text-xs">(Optional)</span> </label>
                            <input
                                name="bookingId"
                                type="text"
                                value={contact.bookingId}
                                onChange={handleChange}
                                className={`sm:w-4/5 rounded-md border-2 border-[#468CF7] p-4 h-[40px] w-full ${isSubmitted ? 'bg-[F3F6FB]' : 'bg-[#FFFFFF]'}`}
                                autoComplete="off"
                                disabled={isSubmitted} />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1">
                            <label className="sm:w-1/6">Email:</label>
                            <div className="flex flex-col sm:w-4/5">
                                <input name="email"
                                    type="text"
                                    value={contact.email}
                                    onChange={handleChange}
                                    className={`rounded-md border-2 border-[#468CF7] p-4 h-[40px] ${isSubmitted ? 'bg-[F3F6FB]' : 'bg-[#FFFFFF]'}`}
                                    autoComplete="off"
                                    disabled={isSubmitted} />
                                {isValid || <p className="w-full text-red-400 text-sm place-self-end">Invalid email</p>}
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <label>Message:</label>
                            <textarea name="message"
                                value={contact.message}
                                onChange={handleChange}
                                className={`rounded-md border-2 border-[#468CF7] p-2 h-[98px] w-full ${isSubmitted ? 'bg-[F3F6FB]' : 'bg-[#FFFFFF]'}`}
                                disabled={isSubmitted} />
                        </div>
                        <Buttons
                            data={data}
                            loading={loading}
                            error={error}
                            setContact={setContact}
                            isSubmitted={isSubmitted}
                            setIsSubmitted={setIsSubmitted}
                        />
                    </form>
                </div>
            </main >
        </>
    )
}

const Buttons = (props) => {
    const { data, loading, error, isSubmitted,
        setIsSubmitted, setContact } = props;
    const clickHandler = () => {
        setContact(initContact);
        setIsSubmitted(false);
    }

    return (
        <div>
            {isSubmitted ?
                <div>
                    <p className={`text-center text-xl py-2 
                        ${data?.success ?
                            "font-[Playwrite_US_Trad] font-light" :
                            "text-red-400"}`}>
                        {data?.success ? data?.message : error}
                    </p>
                    < button
                        type="button"
                        className="w-full bg-linear-[88deg,#3511FB,#4AA5F6] text-2xl font-light h-[56px] sm:text-3xl md:h-[64px]"
                        onClick={clickHandler}>
                        Clear Form
                    </button>
                </div>
                :
                <button
                    type="submit"
                    className="w-full bg-linear-[88deg,#3511FB,#4AA5F6] text-2xl font-light h-[56px] sm:text-3xl md:h-[64px]"
                    disabled={loading}>
                    Send
                </button>
            }
        </div>
    )
}

export default Contact