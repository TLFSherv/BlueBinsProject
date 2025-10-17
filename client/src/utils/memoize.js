export function handleInputChange(fn) {
    // key: input text, value: list of suggestions
    const suggestionCache = new Map();
    return async function (...args) {
        try {
            const key = JSON.stringify(args);
            if (suggestionCache.has(key)) {
                return suggestionCache.get(key);
            }

            const result = await fn.apply(this, args); // API call


            suggestionCache.set(key, result);
            return result;
        } catch (err) {
            console.log('Error with memoization: ' + err);
        }
    };
}

export function handleSuggestionSelect(fn) {
    // key: place ID or address, value: detailed info
    const detailsCache = new Map();
    return async function (...args) {
        try {
            const key = args[0];
            if (detailsCache.has(key)) {
                return detailsCache.get(key);
            }

            const result = await fn.apply(this, args[1]); // API call


            detailsCache.set(key, result);
            return result;
        } catch (err) {
            console.log('Error with memoization: ' + err);
        }
    };
}


