import React, { useContext } from "react";
import Slider from "../components/Slider";
import { BookingContext } from "../store/BookingProvider";

export const BookingQuantity = (props) => {
    const { inputHandler, inputs } = useContext(BookingContext)
    const { quantity } = inputs
    return (
        <div className="flex flex-col gap-6 m-6">
            <p>How many bags do you want us to collect?</p>
            <label>Number of bags:
                <input
                    type="number"
                    min={1} max={5}
                    value={quantity}
                    className="rounded-md border-2 border-[#468CF7] h-[32px] p-4 ml-2"
                    disabled
                />
            </label>
            <Slider inputHandler={inputHandler} quantity={quantity} />
        </div>
    )
}