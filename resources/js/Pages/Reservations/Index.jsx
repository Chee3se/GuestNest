import Layout from "@/Layouts/Layout.jsx";
import {Head, Link} from "@inertiajs/react";
import {useState} from 'react';

export default function Index({ auth, reservations }) {
    const [entries, setEntries] = useState(reservations);

    const cancelReservation = (id) => {
        axios.delete(route('reservations.destroy', id))
            .then(response => {
                console.log(response.data.message);
                setEntries(entries.filter(entry => entry.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Layout
            user={auth.user}
        >
            <Head title="Reservations" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="sm:text-8xl text-6xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold h-40">Reservations</h1>
                    <div className="flex flex-col w-full">
                        {entries.length === 0 && (
                            <div className="flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 my-2">
                                <h2 className="text-2xl font-semibold mx-auto dark:text-gray-200">You have not reserved any place yet!</h2>
                            </div>
                        )}
                        {entries.map((reservation) => (
                            <div key={reservation.id}
                                 className={`relative flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 my-2 ${reservation.approved ? 'border-green-500 border-4 bg-green-200' : 'border-red-500 bg-red-200 border-4'}`}>
                                <div className="bg-gray-100 py-2 px-4 rounded-xl w-fit mb-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-950">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">address</p>
                                    <p className="text-lg dark:text-gray-300">{reservation.property.address}</p>
                                </div>
                                <div className="bg-gray-100 py-2 px-4 rounded-xl w-fit mb-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-950">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">time to stay</p>
                                    <p className="text-lg dark:text-gray-300">{Math.floor((new Date(reservation.check_out) - new Date(reservation.check_in)) / (1000 * 60 * 60 * 24))} day/s</p>
                                </div>
                                <div className="bg-gray-100 py-2 px-4 rounded-xl w-fit mb-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-950">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">status</p>
                                    <p className="text-lg dark:text-gray-300">{reservation.approved ? 'Approved' : 'Awaiting approval'}</p>
                                </div>
                                <button
                                    className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                    onClick={() => {cancelReservation(reservation.id)}}
                                >
                                    Cancel
                                </button>
                                <Link href={route('property.show', reservation.property.id)}>
                                    <img src={reservation.thumbnail.path} alt={reservation.property.title}
                                         className="lg:absolute w-max h-60 right-8 top-1.5 object-cover rounded-lg my-2"/>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
