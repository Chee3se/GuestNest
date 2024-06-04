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
                    <h1 className="text-6xl text-gray-600 dark:text-white">Welcome!</h1>
                </div>
            </div>
        </Layout>
    );
}
