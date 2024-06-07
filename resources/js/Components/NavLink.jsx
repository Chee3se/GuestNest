import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'my-3 py-3 inline-flex items-center px-7 text-xl font-bold leading-5 transition duration-150 ease-in-out focus:outline-none px-2 py-1 rounded-2xl ' +
                (active
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00DBDE] to-[#FC00FF] focus:border-yellow-700'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
