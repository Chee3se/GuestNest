import {Head, Link, router} from "@inertiajs/react";
import Layout from "@/Layouts/Layout.jsx";
import ClickableImage from "@/Components/ClickableImage.jsx";
import { useForm } from '@inertiajs/react';
import {useEffect, useState} from 'react';
import DateInput from "@/Components/Reserve/DateInput.jsx";
import NumberInput from "@/Components/Reserve/NumberInput.jsx";
import InputError from "@/Components/InputError.jsx";
import Notification from "@/Components/Reserve/Notification.jsx";
import CommentSection from "@/Components/Properties/CommentSection.jsx";

export default function Index({ auth, property }) {
    const [notificationStatus, setStatus] = useState('');
    const [notificationMessage, setMessage] = useState('');
    const [notificationShow, setShow] = useState(false);
    const countdown = 5000;
    const cooldown = 2000;
    const { data, setData, post, processing, errors } = useForm({
        check_in: new Date().toISOString().split('T')[0],
        check_out: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        guests: 1,
    });

    const submit = (e) => {
        e.preventDefault();

        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        axios.post(route('property.reserve', {id: property.id}), data)
            .then((res) => {
                console.log(res.data);
                const data = res.data;
                setStatus(data.status);
                setMessage(data.message);
                setShow(true);
            })
            .then(() => {
                setTimeout(() => {
                    setShow(false);
                }, countdown + cooldown);
            })

    };

    return (
        <Layout
            user={auth.user}
        >
            <Head title={property.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="lg:text-8xl text-6xl font-semibold w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] h-40">{property.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="col-span-3 pb-10">
                            <ClickableImage src={property.images[0].path} alt={property.title}
                                            className="w-full h-96 object-cover rounded"/>
                            <Link href={route('gallery', {id: property.id})}> <p className="text-center text-lg text-gray-600 dark:text-gray-300">View Gallery</p></Link>
                        </div>
                        <div className="col-span-2 px-6 py-6 flex flex-col gap-4 lg:border-x-2">
                            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">Hosted
                                by {property.user.name}</p>
                            <p className="text-xl text-gray-700 dark:text-gray-400 pb-6">{property.description}</p>
                            <div className="flex items-center flex-row gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960"
                                     width="30px" fill="#e8eaed"
                                     className="py-auto fill-current text-gray-600 dark:text-gray-200">
                                    >
                                    <path
                                        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                                </svg>
                                <p className="text-xl font-semibold text-gray-600 dark:text-gray-100">Guests</p>
                                <p className="text-xl text-gray-600 dark:text-gray-400">{property.guests}</p>
                            </div>
                            <div className="flex items-center flex-row gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960"
                                     width="30px" fill="#e8eaed"
                                     className="py-auto fill-current text-gray-600 dark:text-gray-200">
                                    >
                                    <path
                                        d="M80-200v-240q0-27 11-49t29-39v-112q0-50 35-85t85-35h160q23 0 43 8.5t37 23.5q17-15 37-23.5t43-8.5h160q50 0 85 35t35 85v112q18 17 29 39t11 49v240h-80v-80H160v80H80Zm440-360h240v-80q0-17-11.5-28.5T720-680H560q-17 0-28.5 11.5T520-640v80Zm-320 0h240v-80q0-17-11.5-28.5T400-680H240q-17 0-28.5 11.5T200-640v80Zm-40 200h640v-80q0-17-11.5-28.5T760-480H200q-17 0-28.5 11.5T160-440v80Zm640 0H160h640Z"/>
                                </svg>
                                <p className="text-xl font-semibold text-gray-600 dark:text-gray-100">Beds</p>
                                <p className="text-xl text-gray-600 dark:text-gray-400">{property.beds}</p>
                            </div>
                            <div className="flex items-center flex-row gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960"
                                     width="30px" fill="#e8eaed"
                                     className="py-auto fill-current text-gray-600 dark:text-gray-200">
                                    >
                                    <path
                                        d="M260-340h440v30q0 13 8.5 21.5T730-280q13 0 21.5-8.5T760-310v-124q0-21-8-39.5T730-506v-94q0-33-23.5-56.5T650-680H520q-11 0-21 3t-19 9q-9-6-19-9t-21-3H310q-33 0-56.5 23.5T230-600v94q-14 14-22 32.5t-8 39.5v124q0 13 8.5 21.5T230-280q13 0 21.5-8.5T260-310v-30Zm0-60v-40q0-17 11.5-28.5T300-480h360q17 0 28.5 11.5T700-440v40H260Zm30-140v-80h160v80H290Zm220 0v-80h160v80H510ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0 0v-640 640Z"/>
                                </svg>
                                <p className="text-xl font-semibold text-gray-600 dark:text-gray-100">Bedrooms</p>
                                <p className="text-xl text-gray-600 dark:text-gray-400">{property.bedrooms}</p>
                            </div>
                            <div className="flex items-center flex-row gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960"
                                     width="30px" fill="#e8eaed"
                                     className="py-auto fill-current text-gray-600 dark:text-gray-200">
                                    >
                                    <path
                                        d="M360-240q17 0 28.5-11.5T400-280q0-17-11.5-28.5T360-320q-17 0-28.5 11.5T320-280q0 17 11.5 28.5T360-240Zm120 0q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm120 0q17 0 28.5-11.5T640-280q0-17-11.5-28.5T600-320q-17 0-28.5 11.5T560-280q0 17 11.5 28.5T600-240ZM360-360q17 0 28.5-11.5T400-400q0-17-11.5-28.5T360-440q-17 0-28.5 11.5T320-400q0 17 11.5 28.5T360-360Zm120 0q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm120 0q17 0 28.5-11.5T640-400q0-17-11.5-28.5T600-440q-17 0-28.5 11.5T560-400q0 17 11.5 28.5T600-360ZM480-720q-83 0-141.5 58.5T280-520q0 17 11.5 28.5T320-480h320q17 0 28.5-11.5T680-520q0-83-58.5-141.5T480-720Zm0 60q53 0 91.5 34.5T618-540H342q8-51 46.5-85.5T480-660ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0 0v-640 640Z"/>
                                </svg>
                                <p className="text-xl font-semibold text-gray-600 dark:text-gray-100">Bathrooms</p>
                                <p className="text-xl text-gray-600 dark:text-gray-400">{property.baths}</p>
                            </div>
                        </div>
                        <div className="col-span-2 lg:col-span-1 lg:border-r-2 flex flex-col gap-8">
                            <p className="ml-6 mr-0 lg:mx-auto text-xl font-normal text-gray-700 dark:text-gray-300"><span
                                className="font-semibold text-gray-900 dark:text-gray-100">€{property.price}</span> night
                            </p>
                            <form onSubmit={submit} method="POST" className="flex flex-col px-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col pb-4">
                                        <DateInput id="check_in" label="Check-in"
                                                   defaultValue={new Date().toISOString().split('T')[0]}
                                                   minDate={new Date().toISOString().split('T')[0]}
                                                   onChange={(value) => setData('check_in', value)}/>
                                        <InputError message={errors.check_in} className="mt-2"/>
                                    </div>
                                    <div className="flex flex-col pb-4">
                                        <DateInput id="check_out" label="Checkout"
                                                   defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                                   minDate={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                                   onChange={(value) => setData('check_out', value)}/>
                                        <InputError message={errors.check_out} className="mt-2"/>
                                    </div>
                                </div>

                                <NumberInput id="guests" label="Guests" min="1" max={property.guests} defaultValue={1}
                                             onChange={(value) => setData('guests', value)}/>
                                <InputError message={errors.guests} className="mt-2"/>

                                <button
                                    className={`my-10 mx-auto btn overflow-hidden relative w-64 py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full before:bg-pink-600 before:left-0 before:top-0 before:-translate-y-full ${property.available ? 'hover:before:translate-y-0 before:transition-transform bg-cyan-400 text-white' : 'bg-gray-400 text-gray-500 cursor-not-allowed'}`}
                                    disabled={!property.available || property.user.id === auth.user.id}
                                >
                                    <span className="relative">Reserve</span>
                                </button>
                            </form>
                            <p className="ml-6 mr-0 lg:mx-auto text-xl font-semibold text-gray-900 dark:text-gray-100"> <span className="font-normal text-gray-700 dark:text-gray-300">total price </span>€{property.price * data.guests}
                            </p>
                        </div>
                    </div>
                    <Notification status={notificationStatus} message={notificationMessage} show={notificationShow} countdown={countdown}/>
                    <CommentSection property={property}/>
                </div>

            </div>
        </Layout>
    )
}
