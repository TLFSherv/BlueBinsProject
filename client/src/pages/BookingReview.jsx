import { useContext } from "react";
import { BookingContext } from "../store/BookingProvider";

export const BookingReview = (props) => {
    const { inputs: { checkboxChecked }, inputHandler } = useContext(BookingContext)
    return (
        <div className="m-[32px] grid gap-4">
            <p>
                Please confirm that your bags only contain items made of these materials:
            </p>
            <ul className="list-disc list-inside">
                <li>Tin or Steel</li>
                <li>Aluminum</li>
                <li>Glass</li>
            </ul>
            <div className="flex flex-col gap-6">
                <div>
                    <label>I agree the bags only contain the items above
                        <input
                            className="m-2 accent-purple-500/75"
                            type="checkbox"
                            checked={checkboxChecked}
                            onChange={e => inputHandler("checkboxChecked",
                                e.target.checked)}
                        />
                    </label>
                    <p className="text-sm text-red-400 pt-1">{props.error}</p>
                </div>
                <p className="text-xs">
                    Plastics and cardboard should not be included in your recycling,
                    for more information please refer to the government website.
                </p>
            </div>
        </div>
    )
}

