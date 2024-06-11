import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import Layout from "@/Layouts/Layout.jsx";
import ClickableImage from "@/Components/ClickableImage.jsx";
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Gallery({ auth, property }) {

    const [images, setImages] = useState(property.images);

    const { data, setData, post, processing, errors } = useForm({
        image: '',
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const updateImages = () => {
        axios.get(route('property.images', { id: property.id }))
            .then(response => {
                setImages(response.data.images);
            });
    }

    const uploadImage = (e) => {
        e.preventDefault();

        post(route('property.images.upload', { id: property.id }))
            .then(response => {
                updateImages();
            })
            .catch(error => {
                // Handle the error
            });
    };

    const deleteImage = (imageId) => {
        axios.delete(route('property.images.delete', { id: property.id, imageId: imageId }))
            .then(response => {
                updateImages();
            })
            .catch(error => {
                // Handle the error
            });
    };

    const setMainImage = (imageId) => {
        axios.post(route('property.images.setMain', { id: property.id, imageId: imageId }))
            .then(response => {
                updateImages();
            })
            .catch(error => {
                // Handle the error
            });
    };

    return (
        <Layout user={auth.user}>
            <Head title="Gallery" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="lg:text-8xl text-6xl font-semibold w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] h-40">Gallery</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div key={image.id} className="relative w-full h-64">
                                <ClickableImage src={image.path} alt='image' className="w-full h-full object-cover rounded" />
                                {auth.user.id === property.user_id && (
                                    <>
                                        <button
                                            onClick={() => deleteImage(image.id)}
                                            className="mt-4 absolute top-0 right-0 middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            data-ripple-light="true"
                                        >
                                            Delete
                                        </button>
                                        <input type="radio" name="mainImage" value={image.id}
                                               onChange={() => setMainImage(image.id)} checked={image.is_main}
                                               className="absolute bottom-0 left-0"/>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    {auth.user.id === property.user_id && (
                        <form onSubmit={uploadImage} className="flex flex-col items-center mt-10">
                            <input type="file" onChange={handleImageChange} className="mb-3"/>
                            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-none cursor-pointer">Upload</button>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );
}
