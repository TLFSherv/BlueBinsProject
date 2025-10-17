import React, { useState } from "react";

const useValidate = () => {
    const [isValid, setIsValid] = useState(true);
    const isValidEmail = (email) => {
        const result = email &&
            typeof email === "string" &&
            email.includes('@') &&
            email.includes('.');
        setIsValid(result)
        return result;
    }
    return { isValid, isValidEmail }
}

export default useValidate

