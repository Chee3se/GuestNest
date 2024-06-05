import { Link, Head } from '@inertiajs/react';
import Layout from "@/Layouts/Layout";

export default function Home({ auth }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <Layout
            user={auth.user}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-8xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-medium">GuestNest</h1>
                    <p className="mt-4 text-2xl text-gray-600 font-medium dark:text-lime-50">The best way to manage your guests.</p>
                </div>
            </div>
        </Layout>
    );
}
