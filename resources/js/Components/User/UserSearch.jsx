import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from '@/Components/Modal.jsx';
import EditUserForm from "@/Components/User/EditUserForm.jsx";
import EditUserPassForm from "@/Components/User/EditUserPassForm.jsx";
import AddUserForm from "@/Components/User/AddUserForm.jsx";

export default function UserSearch({ user, className = '' }) {
    const input = useRef();
    const [search, setSearch] = useState('');
    const [entries, setEntries] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState({field: 'id', order: 'asc'})
    const [showEditModal, setShowEditModal] = useState(false)
    const [showEditPassModal, setShowEditPassModal] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    useEffect(() => {
        fetchEntries();
    }, [search, page, sort]);

    useEffect(() => {
        setPage(1);
    }, [search, sort]);

    const fetchEntries = async () => {
        try {
            const response = await axios.get(route('admin.users.index'), {
                params: {
                    search,
                    page,
                    perPage,
                    sort: sort
                }
            });
            setEntries(response.data.data);
            setTotalPages(Math.ceil(response.data.total / perPage));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleNextPage = () => {
        if (page < totalPages) { // Check if current page is less than total pages
            setPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleSort = (field) => {
        setSort(prevSort => {
            const newOrder = prevSort.field === field && prevSort.order === 'asc' ? 'desc' : 'asc';
            return {field, order: newOrder};
        });
    };

    const handleDeleteClick = async (entry) => {
        try {
            await axios.delete(route('admin.users.destroy', entry.id));
            fetchEntries(); // refresh the user list
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditClick = (entry) => {
        setSelectedEntry(entry);
        setShowEditModal(true);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        fetchEntries();
    }

    const handleEditPassClick = (entry) => {
        setSelectedEntry(entry);
        setShowEditPassModal(true);
    }

    const closeEditPassModal = () => {
        setShowEditPassModal(false);
        fetchEntries();
    }

    const handleAddUserClick = () => {
        setShowAddUserModal(true);
    }

    const closeAddUserModal = () => {
        setShowAddUserModal(false);
    }



    const ArrowIcon = ({ field }) => (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24"  fill="#e8eaed" className='fill-black dark:fill-white'>
            <path d={sort.field === field && sort.order === 'asc' ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"} />
        </svg>
    )

    return (
        <div className={`bg-stone-100 dark:bg-gray-950 px-4 py-2 rounded-md ${className}`} style={{maxWidth: '100%'}}>
            <div className="relative flex items-center gap-2">
                <div className="relative">
                    <input
                        type="text"
                        className='border-0 dark:border-0 bg-stone-200 dark:bg-gray-900 dark:text-gray-300 focus:border-0 dark:focus:border-0 focus:ring-0 dark:focus:ring-0 rounded-md shadow-sm pl-10'
                        ref={input}
                        value={search}
                        placeholder={`Search Users...`}
                        onChange={handleSearch}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <button onClick={handleAddUserClick} className="bg-green-700 p-2 rounded-lg text-white hover:bg-green-600 duration-200 ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <AddUserForm onClose={closeAddUserModal} show={showAddUserModal}/>
            </div>
            <div style={{width: '100%', overflowX: 'auto'}}>
                <table
                    className="my-4 min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden"
                    style={{minWidth: '1000px'}}>
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            style={{minWidth: '100px'}}>
                             <button onClick={() => handleSort('id')} className='flex flex-row'>ID <ArrowIcon field='id' /></button>
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            style={{minWidth: '200px'}}>
                             <button onClick={() => handleSort('name')} className='flex flex-row'>Name <ArrowIcon field='name'/></button>
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            style={{minWidth: '200px'}}>
                             <button onClick={() => handleSort('email')} className='flex flex-row'>EMAIL <ArrowIcon field='email'/></button>
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            style={{minWidth: '200px'}}>
                             <button onClick={() => handleSort('role')} className='flex flex-row'>Role <ArrowIcon field='role'/></button>
                       </th>
                       <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            style={{minWidth: '200px'}}>
                       </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {entries.map(entry => (
                        <tr key={entry.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{entry.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{entry.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">{entry.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{entry.roles[0]?.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-gray-100">
                                    {user.id === entry.id ? (
                                        <p className="text-green-600 dark:text-green-400 py-2 font-bold text-center pr-5"
                                        >you</p>
                                    ) : (
                                    <>
                                        {/* Edit */}
                                        <button className='bg-blue-800 p-2 rounded-lg text-white hover:bg-blue-600 duration-200 mr-3' onClick={() => handleEditClick(entry)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className='fill-white'>
                                                <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
                                            </svg>
                                        </button>
                                        {/* Delete */}
                                        <button className='bg-red-800 p-2 rounded-lg text-white hover:bg-red-600 duration-200 mr-3' onClick={() => handleDeleteClick(entry)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"
                                                ><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                            </svg>
                                        </button>
                                        {/* Change Password */}
                                        <button className='bg-cyan-800 p-2 rounded-lg text-white hover:bg-cyan-600 duration-200 mr-3' onClick={() => handleEditPassClick(entry)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                                <path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z"/>
                                            </svg>
                                        </button>
                                    </>
                                )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    <div className="flex justify-between items-center my-4">
                        <button onClick={handlePrevPage} className={`text-blue-500 hover:text-blue-700 dark:text-white dark:hover:text-gray-300 font-bold py-2 px-4 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"  fill="currentColor">
                                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                            </svg>
                        </button>
                        <span className="text-gray-700 dark:text-gray-300">{page}</span>
                        <button onClick={handleNextPage} className={`text-blue-500 hover:text-blue-700 dark:text-white dark:hover:text-gray-300 font-bold py-2 px-4 rounded ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <Modal onClose={closeEditModal} show={showEditModal} entry={selectedEntry}>
                <p className="font-medium text-6xl p-4 text-center dark:text-amber-50">Edit a user</p>
                <EditUserForm user={selectedEntry} onSuccess={closeEditModal}/>
            </Modal>
            <Modal onClose={closeEditPassModal} show={showEditPassModal} entry={selectedEntry}>
                <p className="font-medium text-6xl p-4 text-center dark:text-amber-50">Edit password</p>
                <EditUserPassForm user={selectedEntry} onSuccess={closeEditPassModal}/>
            </Modal>
        </div>
    );
}
