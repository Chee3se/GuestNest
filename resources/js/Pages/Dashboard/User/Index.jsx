import Layout from "@/Layouts/Layout.jsx";
import {Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CreatePropertyForm from "@/Components/Properties/CreatePropertyForm.jsx";
import axios from "axios";

export default function Index({ auth }) {
    const [properties, setProperties] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showCreatePropertyForm, setShowCreatePropertyForm] = useState(false);

    useEffect(() => {
        axios.get(route('user.properties'))
            .then(response => setProperties(response.data));

        axios.get(route('user.reservations'))
            .then(response => setReservations(response.data));
    }, []);

    function approveReservation(reservationId) {
        axios.patch(route('reservations.update', reservationId), {
            approved: true
        })
            .then(response => {
                // Re-fetch the reservations
                axios.get(route('user.reservations'))
                    .then(response => setReservations(response.data));
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    }
    function deleteProperty(propertyId) {
        axios.delete(route('property.delete', propertyId))
            .then(response => {
                // Re-fetch the properties
                axios.get(route('user.properties'))
                    .then(response => setProperties(response.data));
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
    }


    return (
        <Layout user={auth.user}>
            <Head title="Dashboard"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="sm:text-8xl text-6xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold h-40">Dashboard</h1>
                    <div className="flex flex-col w-full bg-white rounded-lg shadow-lg p-8">
                        <CreatePropertyForm show={showCreatePropertyForm} onClose={() => setShowCreatePropertyForm(false)}/>
                        <div className="flex flex-row">
                            <h2 className="text-2xl font-semibold mb-4">Your Properties</h2>
                            <button onClick={() => setShowCreatePropertyForm(true)}
                                    className="bg-green-700 p-2 rounded-lg text-white hover:bg-green-600 duration-200 ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                            </button>
                        </div>
                        {properties.map((property) => (
                            <div key={property.id} className="my-2 flex justify-between items-center">
                                <Link href={route('property.show', property.id)} className="flex-grow">
                                    <div className="flex flex-col w-full bg-gray-100 rounded-lg shadow-md p-4">
                                        <h3 className="text-xl font-semibold">{property.name}</h3>
                                        <p className="text-lg">{property.address}</p>
                                    </div>
                                </Link>
                                <button onClick={() => deleteProperty(property.id)} className="bg-red-500 text-white py-2 px-4 rounded-none cursor-pointer ml-4">Delete</button>
                            </div>
                        ))}
                        <h2 className="text-2xl font-semibold mt-8 mb-4">Reservation Requests</h2>
                        {reservations.map((reservation) => (
                            <div key={reservation.id}
                                 className={`flex flex-col w-full bg-gray-100 rounded-lg shadow-md p-4 my-2 ${reservation.approved ? 'border-green-500 border-4' : 'border-red-500 border-4'}`}>
                                <h3 className="text-xl font-semibold">{reservation.property.name}</h3>
                                <p className="text-lg">{reservation.property.address}</p>
                                <p className="text-lg">{reservation.check_in} - {reservation.check_out}</p>
                                <p className="text-lg">{reservation.approved ? 'Accepted' : 'Not Accepted'}</p>
                                {!reservation.approved ? (
                                    <button onClick={() => approveReservation(reservation.id)}
                                            className="bg-green-700 p-2 rounded-lg text-white hover:bg-green-600 duration-200 mt-2">
                                        Approve
                                    </button>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
