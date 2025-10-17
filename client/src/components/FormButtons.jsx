import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../store/BookingProvider"

const isAddressEmpty = (address) => {
    return !address ||
        Object.keys(address).length === 0 &&
        address.constructor === Object;
}

const isDateInvalid = (dateString) => {
    return typeof dateString !== "string" ||
        isNaN(new Date(dateString));
}

const FormButtons = (props) => {
    const { activeIndex, setActiveIndex, setError } = props;
    const navigate = useNavigate();
    const { inputs: { address, date, checkboxChecked },
        loading, submitForm } = useContext(BookingContext);

    useEffect(() => {
        if (activeIndex < 0)
            navigate("/");
        else if (activeIndex === 4)
            submitForm();
    }, [activeIndex])

    const handleForward = () => {
        if (activeIndex === 0 && isAddressEmpty(address)) {
            // set error message
            setError("Please enter an address and select from the list of suggestions.")
            return
        }
        else if (activeIndex === 2 && isDateInvalid(date)) {
            // set error message
            setError("Please select a date on the date wheel.")
            return
        }
        else if (activeIndex === 3 && !checkboxChecked) {
            setError("Please check checkbox to submit.")
            return
        }
        setActiveIndex(activeIndex + 1);
        setError("")
    }
    const handleBack = () => {
        setError("")
        setActiveIndex(activeIndex - 1)
    }

    return (
        <div className="flex flex-col-reverse gap-6 px-4 md:flex-row">
            <button onClick={handleBack}
                className="w-full h-[56px] text-xl bg-linear-[88deg,#020297,#6A3CFA]"
                type="button">
                Back
            </button>
            <button onClick={handleForward}
                className="w-full h-[56px] text-xl bg-linear-[88deg,#3511FB,#4AA5F6]"
                type="button"
                disabled={loading}>
                {activeIndex < 3 ? "Next" : "Submit"}
            </button>
        </div>
    )
}

export default FormButtons