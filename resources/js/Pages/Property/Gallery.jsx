import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import Layout from "@/Layouts/Layout.jsx";
import ClickableImage from "@/Components/ClickableImage.jsx";
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Gallery({ auth, property }) {
    const { data, setData, post, processing, errors } = useForm({
        image: '',
    });

    const submit = (e) => {
        e.preventDefault();
        axios.post(route('gallery.save', property.id), data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                setImages([...images, data.image])
            });
    }

    const [images, setImages] = useState(property.images);
    console.log(images);
    const deleteImage = async (id) => {
        await axios.delete(route('gallery.delete', id));
        setImages(images.filter(image => image.id !== id));
    }

    const updateMainImage = async (id) => {
        await axios.post(route('gallery.main', id));
        setImages(images.map(image => image.id === id ? { ...image, is_main: true } : { ...image, is_main: false }));
    }

    const previewImage = (event) => {
        setData('image', event.target.files[0]);

        const file = event.target.files[0];
        const preview = document.getElementById('preview');

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                preview.src = reader.result;
                preview.style.display = 'block';
            }

            reader.readAsDataURL(file);
        } else {
            preview.src = "";
            preview.style.display = 'none';
        }
    }

    return (
        <Layout user={auth.user}>
            <Head title="Gallery" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="lg:text-8xl text-6xl font-semibold w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] h-40">Gallery</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div key={image.id} className="relative w-full h-64 mb-16">
                                <ClickableImage src={image.path} alt='image'
                                                className="w-full h-full object-cover rounded"/>
                                {auth.user.id === property.user_id && (
                                    <div className="flex flex-row gap-4">
                                        <input type='radio' name='main_image' id={image.id} value={image.id}
                                               className='peer hidden' checked={image.is_main}
                                               onChange={() => updateMainImage(image.id)}/>
                                        <label htmlFor={image.id}
                                               className='flex-grow mt-4 block cursor-pointer select-none rounded-xl bg-gray-300 p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>Main</label>
                                        <button onClick={() => deleteImage(image.id)}
                                                className="mt-4 bg-red-500 h-10 text-white p-2 rounded-xl flex-grow text-center">Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {auth.user.id === property.user_id && (
                        <div className="flex flex-row gap-10 mt-32">
                            <form onSubmit={submit} className="flex flex-col justify-center">
                                <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                                    <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24"
                                             stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                        </svg>
                                        <span className="text-gray-600 font-medium">Upload file</span>
                                    </label>
                                    <input id="upload" type="file" className="hidden" onChange={previewImage}/>
                                </div>
                                <button
                                    className=" ml-4 mt-10 middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >
                                    Upload
                                </button>
                            </form>
                            <img id="preview" src="" alt="Preview" style={{display: 'none'}}/>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
