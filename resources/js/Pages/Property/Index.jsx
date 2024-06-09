import {Head, Link} from "@inertiajs/react";
import {useState, useEffect} from 'react';
import Layout from "@/Layouts/Layout.jsx";
import PropertyBrowser from "@/Components/PropertyBrowser.jsx";
import Tutorial from "@/Components/Tutorial.jsx";

export default function Index({ auth }) {

    return (
        <Layout
            user={auth.user}
        >
            <Head title="Browse" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="sm:text-8xl text-6xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-medium h-40">Houses</h1>
                    <PropertyBrowser/>
                </div>
            </div>
        </Layout>
    )
}
