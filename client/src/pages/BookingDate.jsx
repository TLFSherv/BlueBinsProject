import { useContext } from "react";
import DateWheel from "../components/DateWheel";
import { BookingContext } from "../store/BookingProvider";

export const BookingDate = (props) => {
    const { inputHandler, inputs: { displayDate } } = useContext(BookingContext)
    return (
        <div className="flex flex-col mx-8 my-2 gap-6">
            <p>
                Select the date you want us to collect on the date wheel below:
            </p>
            <div className="mx-auto flex flex-col">
                <label className="text-center" htmlFor="date">
                    Date selected: <span className="underline">{displayDate}</span>
                </label>
                <p className="text-center text-red-400 pt-1">{props.error}</p>
            </div>
            <DateWheel inputHandler={inputHandler} />
        </div>
    )
}

