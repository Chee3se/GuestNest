import {useEffect, useRef, useState} from "react";
import {Link} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";

export default function PropertyBrowser() {
    const input = useRef();
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState('')
    const [category_id, setCategory] = useState('')
    const [page, setPage] = useState(1);
    const [perPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchEntries();
    }, [search, page, category_id])

    useEffect(() => {
        setPage(1);
    }, [search, category_id])
    const fetchEntries = async () => {
        setLoading(true)
        const response = await axios.post(route('property.all'), {
            search,
            category_id,
            page,
            perPage
        });
        console.log(response.data);
        setEntries(response.data.data);
        setLoading(false);
        setTotalPages(Math.ceil(response.data.total / perPage));
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="relative col-span-1 md:col-span-2 lg:col-span-3 flex flex-row gap-4">
                <TextInput
                    ref={input}
                    type="text"
                    className="flex-grow pl-6 p-2 rounded-lg round shadow-lg bg-gray-100 border-1"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select value={category_id} onChange={e => setCategory(e.target.value)}
                        className="w-24 lg:w-40 p-2 shadow-none px-4 rounded-lg border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 shadow-lg focus:outline-none">
                    <option value="">None</option>
                    <option value="1">House</option>
                    <option value="2">Apartment</option>
                    <option value="3">Condo</option>
                    <option value="4">Townhouse</option>
                    <option value="5">Commercial</option>
                    <option value="6">Land</option>
                </select>

            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-3">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}
                        className="px-3 bg-gray-200 dark:bg-gray-800 w-10 h-10 rounded-full justify-self-start">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#e8eaed"
                         className="fill-current text-gray-800 dark:text-gray-200"
                    >
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                    </svg>
                </button>
                <div className="col-span-1 text-center">
                    <p className="text-gray-800 dark:text-gray-200 text-xl">{page}</p>
                </div>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}
                        className="px-2.5 bg-gray-200 dark:bg-gray-800 w-10 h-10 rounded-full justify-self-end">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#e8eaed"
                         className=" fill-current text-gray-800 dark:text-gray-200"
                    >
                        <path
                            d="M579-480 285-774q-15-15-14.5-35.5T286-845q15-15 35.5-15t35.5 15l307 308q12 12 18 27t6 30q0 15-6 30t-18 27L356-115q-15 15-35 14.5T286-116q-15-15-15-35.5t15-35.5l293-293Z"/>
                    </svg>
                </button>
            </div>
            {loading ?
                [...Array(10)].map((_, index) =>
                    <div key={index} className="bg-white dark:bg-gray-950 shadow-md rounded p-4 animate-pulse mx-auto">
                        <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 my-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
                    </div>
                )
                :
                (entries.length === 0 ?
                        <div className="col-span-3 text-center min-w-full">
                            <p className="text-gray-800 dark:text-gray-200 text-2xl font-bold">Oops!</p>
                            <p className="text-gray-500 dark:text-gray-300 text-xl">Looks like there are no listings that match your
                                criteria, try again and clear your filter with this button...</p>
                            <button onClick={() => {
                                setSearch('');
                                setCategory('');
                                setPage(1);
                            }} className="px-4 py-2 bg-gray-200 rounded mt-4">Clear Filter
                            </button>
                        </div>
                        :
                        entries.map((property, index) => (
                            <Link key={property.id} href={route('property.show', property.id)}
                                  className="w-72 bg-white dark:bg-gray-950 shadow-md rounded p-4 flex flex-col mx-auto">
                                <img src={property.thumbnail?.path} alt={property.title}
                                     className="w-full md:w-64 h-64 object-cover rounded"/>
                                <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold py-2">{property.title}</h2>
                                <p className="text-gray-500 dark:text-gray-400">{property.description}</p>
                                <p className={`mt-auto pt-2 ml-auto mr-2 ${property.available ? 'text-green-500' : 'text-red-500'}`}>{property.available ? 'available' : 'not available'}</p>
                                <div className="flex flex-row items-center gap-2 pt-6">
                                    <p className="w-32 text-gray-950 dark:text-gray-100 font-semibold">€ {property.price}
                                        <span className="text-gray-700 dark:text-gray-300 font-normal"> night</span></p>
                                    <p className="text-gray-500 dark:text-gray-400 ml-auto">Hosted
                                        by {property.user.name}</p>
                                </div>
                            </Link>
                        ))
                )
            }
        </div>
    )
}
