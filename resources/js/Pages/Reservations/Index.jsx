import Layout from "@/Layouts/Layout.jsx";
import {Head} from "@inertiajs/react";

export default function Index({ auth, reservations }) {
    return (
        <Layout
            user={auth.user}
        >
            <Head title="Reservations" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex items-center flex-col">
                    <h1 className="sm:text-8xl text-6xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] font-semibold h-40">Reservations</h1>
                    <div className="flex flex-col w-full">
                        {reservations.length === 0 && (
                            <div className="flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 my-2">
                                <h2 className="text-2xl font-semibold mx-auto dark:text-gray-200">You have not reserved any place yet!</h2>
                            </div>
                        )}
                        {reservations.map((reservation) => (
                            <div key={reservation.id} className={`flex flex-col w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 my-2 ${reservation.approved ? 'border-green-500 border-4' : 'border-red-500 border-4'}`}>
                                <h2 className="text-2xl font-semibold">{reservation.property.name}</h2>
                                <p className="text-lg">{reservation.property.address}</p>
                                <p className="text-lg">{reservation.check_in} - {reservation.check_out}</p>
                                <p className="text-lg">{reservation.approved ? 'Accepted' : 'Not Accepted'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
