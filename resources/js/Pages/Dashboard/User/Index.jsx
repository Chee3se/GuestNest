import Layout from "@/Layouts/Layout.jsx";
import {Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CreatePropertyForm from "@/Components/Properties/CreatePropertyForm.jsx";
import axios from "axios";
import EditPropertyForm from "@/Components/Properties/EditPropertyForm.jsx";

export default function Index({ auth }) {
    const [properties, setProperties] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showCreatePropertyForm, setShowCreatePropertyForm] = useState(false);
    const [showEditPropertyForm, setShowEditPropertyForm] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    useEffect(() => {
        axios.get(route('user.properties'))
            .then(response => {
                setProperties(response.data);
            });

        axios.get(route('user.reservations'))
            .then(response => {
                setReservations(response.data);
                console.log(response.data)
            });
    }, []);

    const deleteProperty = (id) => {
        axios.delete(route('property.destroy', id))
            .then(response => {
                setProperties(properties.filter(property => property.id !== id));
            });
    }

    const editProperty = (property) => {
        console.log(property);
        setSelectedProperty(property);
        setShowEditPropertyForm(true);
    }

    const createProperty = (e) => {
        e.preventDefault();
        setShowCreatePropertyForm(true);
        console.log('create property');
    }

    const handleReservation = (id, status) => {
        if (status !== 'denied') {
            axios.patch(route('reservations.update', id), {
                approved: 'approved'
            })
                .then(response => {
                    setReservations(reservations.filter(reservation => reservation.id !== id));
                });
        } else {
            axios.delete(route('reservations.destroy', id))
                .then(response => {
                    setReservations(reservations.filter(reservation => reservation.id !== id));
                });
        }
    }


    return (
        <Layout user={auth.user}>
            <Head title="Dashboard"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="sm:text-8xl text-6xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold h-40">Dashboard</h1>
                    <h2 className="text-5xl text-gray-600 my-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold">listings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {properties.map((property, index) => (
                            <div key={property.id}
                                  className="z-10 w-72 bg-white dark:bg-gray-950 shadow-md rounded p-4 flex flex-col mx-auto">
                                <Link href={route('property.show', property.id)}>
                                <img src={property.thumbnail?.path} alt={property.title}
                                     className="w-full md:w-64 h-64 object-cover rounded"/>
                                </Link>
                                <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold py-2">{property.title}</h2>
                                <div className="flex flex-row items-center gap-2 pt-6">

                                    <button
                                        className="middle z-20 none center rounded-lg bg-orange-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-light="true"
                                        onClick={() => editProperty(property)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="ml-auto z-20 middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-light="true"
                                        onClick={() => deleteProperty(property.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="flex flex-row items-center gap-2 pt-6">
                                    <p className="w-32 text-gray-950 dark:text-gray-100 font-semibold">€ {property.price}
                                        <span className="text-gray-700 dark:text-gray-300 font-normal"> night</span></p>
                                    <p className={`mt-auto pt-2 mb-2 ml-auto mr-2 ${property.available ? 'text-green-500' : 'text-red-500'}`}>{property.available ? 'available' : 'not available'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className=" ml-4 mt-10 middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={createProperty}
                    >
                        Create
                    </button>
                    <CreatePropertyForm onClose={() => {setShowCreatePropertyForm(false)}} show={showCreatePropertyForm}/>
                    <EditPropertyForm onClose={() => {setShowEditPropertyForm(false)}} show={showEditPropertyForm} property={selectedProperty}/>
                    <h2 className="text-5xl text-gray-600 my-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold">requests</h2>
                    <div className="flex flex-col w-full">
                        {reservations.map((reservation, index) => (
                            <div key={reservation.id}
                                 className={`relative flex flex-col w-full dark:bg-gray-800 rounded-lg shadow-lg p-4 my-2 border-yellow-500 border-4 bg-yellow-50`}>
                                <div
                                    className="bg-gray-100 py-2 px-4 rounded-xl w-fit mb-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-950">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">guests</p>
                                    <p className="text-lg dark:text-gray-300">{reservation.guests}</p>
                                </div>
                                <div
                                    className="bg-gray-100 py-2 px-4 rounded-xl w-fit mb-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-950">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">time to stay</p>
                                    <p className="text-lg dark:text-gray-300">{Math.floor((new Date(reservation.check_out) - new Date(reservation.check_in)) / (1000 * 60 * 60 * 24))} day/s</p>
                                </div>
                                <div
                                    className="bg-gray-100 py-2 px-4 rounded-xl w-fit mb-4 border-2 border-gray-300 dark:bg-gray-900 dark:border-gray-950">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">email</p>
                                    <p className="text-lg dark:text-gray-300">{reservation.user.email}</p>
                                </div>
                                <div>
                                    <button
                                        className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-light="true"
                                        onClick={() => handleReservation(reservation.id, 'denied')}
                                    >
                                        Deny
                                    </button>
                                    <button
                                        className=" ml-4 mt-10 middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        data-ripple-light="true"
                                        onClick={() => handleReservation(reservation.id, 'approved')}
                                    >
                                        Approve
                                    </button>
                                </div>
                                <img src={reservation.thumbnail.path} alt={reservation.property.title}
                                     className="lg:absolute w-max h-60 right-8 top-1.5 object-cover rounded-lg my-2"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
