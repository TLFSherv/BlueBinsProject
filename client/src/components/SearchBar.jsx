import React, { useEffect, useRef, useState, memo } from "react";
import useFetchSuggestions from "../hooks/useFetchSuggestions";

const SearchBar = memo(({ initSearchString, inputHandler }) => {
    const [searchString, setSearchString] = useState(initSearchString)
    const { suggestions, selectPlace } = useFetchSuggestions(searchString);
    const [isActive, setIsActive] = useState(false);
    const searchContainer = useRef(null)

    // Hide suggestions when you click outside suggestions box
    useEffect(() => {
        function outsideClickHandler(e) {
            if (searchContainer.current && !searchContainer.current.contains(e.target)) {
                setIsActive(false);
            }
        }
        document.addEventListener('click', outsideClickHandler);
        return () => {
            document.removeEventListener('click', outsideClickHandler);
        }
    }, [])
    const handleChange = (e) => {
        setSearchString(e.target.value)
        inputHandler("address", {})
        setIsActive(true);
    }
    return (
        <div ref={searchContainer} className="relative">
            <input
                type="text"
                placeholder="Address Line"
                value={searchString}
                onChange={e => handleChange(e)}
                autoComplete="off"
                className="bg-white rounded-md border-2 border-[#468CF7] h-[32px] p-4 w-full"
                onFocus={() => setIsActive(true)}
                maxLength="18"
            />
            {isActive && suggestions.length > 0 && (
                <SuggestionsBox
                    suggestions={suggestions}
                    selectPlace={selectPlace}
                    setSearchString={setSearchString}
                    inputHandler={inputHandler}
                    setIsActive={setIsActive} />
            )}
        </div>
    )
})

const SuggestionsBox = ({ suggestions, selectPlace, setSearchString, inputHandler, setIsActive }) => {
    const handleClick = async (placePrediction) => {
        const place = await selectPlace(placePrediction)
        setSearchString(place?.formattedAddress)
        inputHandler('address', place);
        setIsActive(false);
    }
    return (
        <ul id="suggestionsBox"
            className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {
                suggestions.map(({ text, placePrediction }) => (
                    <li key={text}
                        onClick={() => handleClick(placePrediction)}
                        className="cursor-pointer p-2 hover:bg-gray-100">
                        {text}
                    </li>))
            }
        </ul >
    )
}

export default SearchBar