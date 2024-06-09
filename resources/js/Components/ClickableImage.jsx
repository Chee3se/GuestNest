import React, {useEffect, useState} from 'react';
import Modal from '@/Components/Modal';

export default function ClickableImage({ src, alt, className }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal() {
        console.log('Image clicked');
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    return (
        <div>
            <img src={src} alt={alt} onClick={openModal} className={`${className} cursor-pointer`} />
            <Modal
                show={modalIsOpen}
                onClose={closeModal}
                className="w-fit-content h-fit-content"
            >
                <img src={src} alt={alt} className="w-full"/>
            </Modal>
        </div>
    );
}
