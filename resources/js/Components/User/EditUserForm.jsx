import { useState } from 'react';
import axios from 'axios';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm } from '@inertiajs/react';

export default function EditUserForm({ user, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        _method: 'put',
        name: user.name,
        email: user.email,
        role: user.roles[0]?.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('role', data.role);

        put(route('admin.users.update', user.id), formData)
            .then(() => {
                if (onSuccess) {
                    onSuccess();
                }
            });
    };

    return (
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
                <InputLabel htmlFor="name" value="Email"/>
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
            <div className="flex items-center justify-end mt-4">
                <PrimaryButton className="ms-4" disabled={processing}>
                    Update User
                </PrimaryButton>
            </div>
        </form>
    );
}
