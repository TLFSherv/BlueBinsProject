import { useEffect, useState } from "react";

function useDebounce(input, delay) {
    const [result, setResult] = useState("")
    useEffect(() => {
        if (!input && input.length === 0)
            return

        const timeoutId = setTimeout(() => {
            setResult(input)
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [input]);
    return result
}

export default useDebounce

