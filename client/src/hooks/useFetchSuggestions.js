import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce.js";


let newestRequestId = 0;

const useFetchSuggestions = (searchString) => {
    const [sessionToken, setSessionToken] = useState(null)
    const [suggestions, setSuggestions] = useState([])
    const debouncedSearch = useDebounce(searchString, 300)

    // Create token if it doesn't already exist and when the user starts typing
    useEffect(() => {
        if (!sessionToken && searchString.trim().length > 0) {
            setSessionToken(new google.maps.places.AutocompleteSessionToken())
        }
    }, [sessionToken, debouncedSearch])

    useEffect(() => {
        if (!sessionToken || !debouncedSearch) {
            setSuggestions([])
            return
        }
        else if (debouncedSearch.length > 18)
            return
        let isCancelled = false;
        // To avoid race conditions, store the request ID and compare after the request.
        const requestId = ++newestRequestId;

        // perform api fetch request
        const fetchData = async () => {
            try {
                const bermudaBounds = { north: 32.3961, south: 32.2466, east: -64.6480, west: -64.8918, };
                const sessionRequest = {
                    input: debouncedSearch,
                    sessionToken: sessionToken,
                    includedPrimaryTypes: ['premise'],
                    origin: { lat: 32.3083, lng: -64.7656 }, // Address of Tynes bay
                    language: 'en-US',
                    region: 'bm',
                    includedRegionCodes: ['bm'],
                    locationRestriction: bermudaBounds
                }

                // Fetch autocomplete suggestions
                const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(sessionRequest);
                // If the request has been superseded by a newer request, do not render the output.
                if (isCancelled || requestId !== newestRequestId) return;
                setSuggestions(
                    suggestions.map(({ placePrediction }) => ({
                        text: placePrediction.text.toString(),
                        placePrediction
                    }))
                )
                if (isCancelled)
                    setSuggestions(results)
            } catch (err) {
                console.log('Failed to fetch suggestions: ', err);
            }
        }
        fetchData();

        return () => {
            isCancelled = true; // mark this run as dead
        }

    }, [debouncedSearch, sessionToken])

    // Event handler for clicking on a suggested place.
    const selectPlace = async (placePrediction) => {
        const place = placePrediction.toPlace();
        await place.fetchFields({
            fields: ['id', 'formattedAddress', 'location', 'addressComponents'],
        });

        //Reset session 
        setSessionToken(null);
        setSuggestions([]);
        let lat = place.location.lat();
        let lng = place.location.lng();
        return {
            id: place.id,
            streetNumber: place.addressComponents[0].longText,
            route: place.addressComponents[1].longText,
            locality: place.addressComponents[2].longText,
            parish: place.addressComponents[3].longText,
            formattedAddress: place.formattedAddress,
            latitude: lat.toString().substring(0, 20),
            longitude: lng.toString().substring(0, 20),
            distanceMeters: placePrediction.distanceMeters
        };
    }

    return { suggestions, selectPlace }
}


export default useFetchSuggestions