import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useDatabase from "../hooks/useDatabase";
// Create the context
export const BookingContext = React.createContext()

// Create a provider component
export const BookingProvider = ({ children }) => {
    const initInputs = {
        address: {},
        additionalInfo: "",
        quantity: 1,
        date: "",
        displayDate: "",
        checkboxChecked: true
    };
    const { loading, error, post } = useDatabase();
    const [inputs, setInputs] = useState(initInputs);
    const navigate = useNavigate();

    const inputHandler = useCallback((name, value) => {
        setInputs(prev => ({ ...prev, [name]: value }))
    }, []);

    const submitForm = async () => {
        try {
            const result = await post('http://localhost:2000/bookings', inputs);
            localStorage.setItem("bookingId", result.data.id);
            navigate('/booking/success')

        } catch (err) {
            navigate('/booking/error')
            console.error(err)
        }
    }

    return (
        <BookingContext.Provider
            value={{ inputs, loading, inputHandler, submitForm }}>
            {children}
        </BookingContext.Provider>
    )

}