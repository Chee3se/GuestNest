import React, {useEffect, useState} from 'react';
export default function Notification({ status = 'error', message = 'no message provided', show = false, countdown = 5000}) {
    const [showNotification, setShowNotification] = useState(show);
    const [countdownLeft, setCountdownLeft] = useState(countdown);

    useEffect(() => {
        let timer;
        if (show) {
            setShowNotification(true);
            setCountdownLeft(countdown);
            timer = setInterval(() => {
                setCountdownLeft(prevCountdown => {
                    if (prevCountdown <= 0) {
                        clearInterval(timer);
                        setShowNotification(false);
                        return 0;
                    } else {
                        return prevCountdown - 1000;
                    }
                });
            }, 1000);
        } else {
            setShowNotification(false);
            setCountdownLeft(0);
        }
        return () => clearInterval(timer);
    }, [show, countdown]);

    const notificationClasses = showNotification ?
        "transform ease-out duration-300 transition translate-y-0 opacity-100 sm:translate-x-0" :
        "transition ease-in duration-100 opacity-0";

    const icon = status === 'error' ? (
        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    ) : (
        <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );

    const title = status === 'error' ? 'An error occurred!' : 'Successfully saved!';

    return (
        <div aria-live="assertive" className={`mt-16 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 ${notificationClasses}`}>
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                <div
                    className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {icon}
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">{title}</p>
                                <p className="mt-1 text-sm text-gray-500">{message}</p>
                                <p className="mt-1 text-sm text-gray-500">This window will close in {countdownLeft / 1000} seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
