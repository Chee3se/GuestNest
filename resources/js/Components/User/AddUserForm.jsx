import { useState } from 'react';
import axios from 'axios';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal.jsx';

export default function AddUserForm({ onClose, show }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('product.store'))
            .then(() => {
                if (onClose) {
                    onClose();
                }
            });
    };

    return (
        <Modal onClose={onClose} show={show}>
            <p className="font-medium text-6xl p-4 text-center dark:text-amber-50">Create a user</p>
            <form onSubmit={submit} method="POST" className="px-10 pb-4 flex flex-col gap-4">
                <div>
                    <InputLabel htmlFor="name" value="Name"/>
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email"/>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="role" value="Role"/>
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="border-0 dark:border-0 bg-stone-200 dark:bg-gray-900 dark:text-gray-300 focus:border-0 dark:focus:border-0 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm mt-1 block w-full"
                    >
                        <option value="">No Role</option>
                        <option value="admin">Admin</option>
                    </select>
                    <InputError message={errors.role} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="password" value="Password"/>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2"/>
                </div>
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password"/>
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2"/>
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Add User
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
