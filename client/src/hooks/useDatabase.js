import { useState } from "react";

const useDatabase = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const post = async (url, body) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body)
            });

            const json = await res.json();
            if (!res.ok) setError(json.message);

            setData(json);
            return json
        }
        // catch (error) {
        //     setError(error);
        //     throw error;
        // }
        finally {
            setLoading(false);
        }
    }
    const get = async (url) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Request failed");

            const json = await res.json();
            setData(json);
            return json
        }
        catch (error) {
            setError(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    const put = async (url, body) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error("Request failed");

            const json = await res.json();
            setData(json);
            return json
        }
        catch (error) {
            setError(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    const deleteReq = async (url, body) => {
        setLoading(true)
        setError(null)

        try {
            console.log(body)
            const res = await fetch(url, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error("Request failed");

            const json = await res.json();
            setData(json);
            return json
        }
        catch (error) {
            setError(error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }
    return { data, loading, error, post, get, put, deleteReq }
}
export default useDatabase
