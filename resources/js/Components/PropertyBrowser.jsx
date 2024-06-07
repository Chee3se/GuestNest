import {useEffect, useState} from "react";

export default function PropertyBrowser() {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        fetchEntries();
    }, [])
    const fetchEntries = async () => {
        const response = await axios.post(route('property.all'));
        console.log(response.data);
        setProperties(response.data.data);
        setLoading(false);
    }

    return (
        <>
            {loading ?
                [...Array(10)].map((_, index) =>
                    <div key={index} className="bg-white shadow-md rounded p-4 w-1/2 my-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 my-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                )
                :
                properties.map((property, index) => (
                    <div key={property.id} className="bg-white shadow-md rounded p-4 w-1/2 my-4">
                        <h2 className="text-2xl font-bold">{property.title}</h2>
                        <p className="text-gray-500">{property.description}</p>
                    </div>
                ))
            }
        </>
    )
}
