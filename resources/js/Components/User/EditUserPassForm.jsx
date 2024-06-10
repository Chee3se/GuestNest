import { useState } from 'react';
import axios from 'axios';
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import { useForm } from '@inertiajs/react';

export default function EditUserPassForm({ user, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        _method: 'put',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);

        put(route('admin.users.password', user.id), formData)
            .then(() => {
                if (onSuccess) {
                    onSuccess();
                }
            });
    };

    return (
        <form onSubmit={submit} method="POST" className="px-10 pb-4 flex flex-col gap-4">
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
                    Change Password
                </PrimaryButton>
            </div>
        </form>
    );
}
