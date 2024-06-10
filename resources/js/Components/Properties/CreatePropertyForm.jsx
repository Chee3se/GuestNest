import { useState } from 'react';
import axios from 'axios';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal.jsx';
import FileInput from "@/Components/FileInput.jsx";

export default function CreatePropertyForm({ onClose, show }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category_id: 1,
        price: '',
        guests: '',
        bedrooms: '',
        beds: '',
        baths: '',
        address: '',
        image: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('property.store'))
            .then(() => {
                if (onClose) {
                    onClose();
                }
            });
    };

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <Modal onClose={onClose} show={show}>
            <p className="font-medium text-6xl p-4 text-center dark:text-amber-50">Create a Property</p>
            <form onSubmit={submit} method="POST" className="px-10 pb-4 flex flex-col gap-4">
                <div>
                    <InputLabel htmlFor="title" value="Title"/>
                    <TextInput
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <InputError message={errors.title} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="description" value="Description"/>
                    <TextInput
                        id="description"
                        type="text"
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    <InputError message={errors.description} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="category_id" value="Category"/>
                    <select
                        id="category_id"
                        name="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="border-0 dark:border-0 bg-stone-200 dark:bg-gray-900 dark:text-gray-300 focus:border-0 dark:focus:border-0 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm mt-1 block w-full"
                    >
                        <option value="1">House</option>
                        <option value="2">Apartment</option>
                        <option value="3">Condo</option>
                        <option value="4">Townhouse</option>
                        <option value="5">Commercial</option>
                        <option value="6">Land</option>
                    </select>
                    <InputError message={errors.category_id} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="price" value="Price"/>
                    <TextInput
                        id="price"
                        type="number"
                        name="price"
                        value={data.price}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('price', e.target.value)}
                    />
                    <InputError message={errors.price} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="guests" value="Guests"/>
                    <TextInput
                        id="guests"
                        type="number"
                        name="guests"
                        value={data.guests}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('guests', e.target.value)}
                    />
                    <InputError message={errors.guests} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="bedrooms" value="Bedrooms"/>
                    <TextInput
                        id="bedrooms"
                        type="number"
                        name="bedrooms"
                        value={data.bedrooms}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('bedrooms', e.target.value)}
                    />
                    <InputError message={errors.bedrooms} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="beds" value="Beds"/>
                    <TextInput
                        id="beds"
                        type="number"
                        name="beds"
                        value={data.beds}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('beds', e.target.value)}
                    />
                    <InputError message={errors.beds} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="baths" value="Baths"/>
                    <TextInput
                        id="baths"
                        type="number"
                        name="baths"
                        value={data.baths}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('baths', e.target.value)}
                    />
                    <InputError message={errors.baths} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="address" value="Address"/>
                    <TextInput
                        id="address"
                        type="text"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    <InputError message={errors.address} className="mt-2"/>
                </div>

                <div>
                    <InputLabel htmlFor="image" value="Image"/>
                    <FileInput
                        id="image"
                        name="image"
                        className="mt-1 block w-full"
                        onChange={handleImageChange}
                    />
                    <InputError message={errors.image} className="mt-2"/>
                </div>
                {previewImage && (
                    <img src={previewImage } alt="Preview" className="mt-2 w-1/2"/>
                )}

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Create Property
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
