import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'my-3 py-3 inline-flex items-center px-7 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none px-2 py-1 rounded-2xl ' +
                (active
                    ? 'bg-yellow-200 dark:bg-blue-800 text-gray-900 dark:text-gray-100 focus:border-yellow-700'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
