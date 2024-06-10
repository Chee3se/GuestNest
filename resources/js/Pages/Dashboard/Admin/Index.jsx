import Layout from "@/Layouts/Layout.jsx";
import {Head} from "@inertiajs/react";
import UserSearch from "@/Components/User/UserSearch.jsx";

export default function Index({ auth }) {
    return (
        <Layout
            user={auth.user}
        >
            <Head title="Admin Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="sm:text-8xl text-6xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold h-40">Admin</h1>
                    <UserSearch user={auth.user}/>
                </div>
            </div>
        </Layout>
    )
}
