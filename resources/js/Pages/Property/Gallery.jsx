import {Head, Link} from "@inertiajs/react";
import {useState, useEffect} from 'react';
import Layout from "@/Layouts/Layout.jsx";
import PropertyBrowser from "@/Components/PropertyBrowser.jsx";
import ClickableImage from "@/Components/ClickableImage.jsx";
import { useForm } from '@inertiajs/react';

export default function Gallery({ auth, property }) {
    console.log(property);

    const { data, setData, post, processing, errors } = useForm({
        image: '',
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const uploadImage = (e) => {
        e.preventDefault();

        // Check if the authenticated user is the owner of the property
        if (auth.user.id !== property.user_id) {
            alert('You are not authorized to perform this action.');
            return;
        }

        post(route('property.images.upload', {id: property.id}))
            .then(response => {
                // Handle the response
            })
            .catch(error => {
                // Handle the error
            });
    };

    const deleteImage = (imageId) => {
        // Check if the authenticated user is the owner of the property
        if (auth.user.id !== property.user_id) {
            alert('You are not authorized to perform this action.');
            return;
        }

        axios.delete(route('property.images.delete', {id: property.id, imageId: imageId}))
            .then(response => {
                // Handle the response
            })
            .catch(error => {
                // Handle the error
            });
    };

    return (
        <Layout
            user={auth.user}
        >
            <Head title="Browse" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    {property.images?.map((image) => (
                        <div key={image.id} className="relative w-48 h-48 mb-5">
                            <ClickableImage src={image.path} alt='image'/>
                            <button onClick={() => deleteImage(image.id)} className="absolute top-0 right-0 bg-red-500 text-white rounded-none cursor-pointer">Delete</button>
                        </div>
                    ))}
                    <form onSubmit={uploadImage} className="flex flex-col items-center mt-5">
                        <input type="file" onChange={handleImageChange} className="mb-3"/>
                        <button type="submit" className="bg-green-500 text-white rounded-none cursor-pointer">Upload</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
