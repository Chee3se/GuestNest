import React from 'react';

const Tutorial = ({ closeTutorial }) => {
    return (
        <>
            <h1 className="text-6xl">What are you looking for?</h1>
            <button onClick={closeTutorial}>Skip tutorial</button>
        </>
    );
};

export default Tutorial;
