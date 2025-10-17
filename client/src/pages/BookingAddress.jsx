import React, { useContext } from "react";
import { GOOGLE_MAPS_API } from "../assets/js/api";
import SearchBar from "../components/SearchBar";
import { BookingContext } from "../store/BookingProvider"

export const BookingAddress = (props) => {
    const { inputs: { address, additionalInfo }, inputHandler }
        = useContext(BookingContext);
    return (
        <>
            <div className="flex flex-col gap-6 m-8">
                <p >
                    Where do you want us to collect your recycling?
                </p>
                <div>
                    <label>Address:
                        <SearchBar
                            initSearchString={address?.formattedAddress || ""}
                            inputHandler={inputHandler}
                        />
                    </label>
                    <p className="text-red-400 text-sm pt-1">{props.error}</p>
                </div>
                <label>Additional information (optional):
                    <textarea
                        placeholder="House color? Are you near the road? Do you have a dog?"
                        onChange={e => inputHandler('additionalInfo', e.target.value)}
                        value={additionalInfo}
                        className="bg-white rounded-md border-2 border-[#468CF7] h-[98px] p-2 w-full" />
                </label>
            </div>
            <script src={import.meta.env.VITE_GOOGLE_MAPS_API} async defer></script>
        </>
    )
}

