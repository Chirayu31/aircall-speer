import React, { useEffect, useState } from 'react';
import { fetchContactById } from '../services/fetchContact';
import { getIconComponent, getCallTypeColor } from './ContactCard';
import { formatDate } from './Contacts';

const Contact = ({ id }) => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchContactById(id);
                setContact(data);
            } catch (error) {
                console.error('Error fetching contact:', error);
            }
        }

        fetchData();
    }, [id]);

    const formattedTime = contact?.created_at ? new Date(contact.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : '';

    return (
        <div className=' bg-white p-4 rounded-md h-full'>
            {contact !== null ? (
                <>
                    <div className={`flex gap-4 items-center mb-4  ${getCallTypeColor(contact.call_type)}`}>
                        <span className={`ml-2`}>{getIconComponent(contact.direction)}
                        </span>
                        <h2 className='font-semibold text-lg'>{contact.call_type}</h2>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-gray-600'>
                            <p>From: {contact.from}</p>
                            <p>Via: {contact.via}</p>
                            <p>To: {contact.to}</p>
                        </div>
                        <div className='text-gray-600'>
                            <p>Direction: {contact.direction}</p>
                            <p>Archived: {contact.is_archived ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    <p className='font-semibold text-gray-500 tracking-wide mt-4'>
                        {formatDate(contact.created_at)}  {formattedTime}
                    </p>
                </>
            ) : (
                <p>Loading contact details...</p>
            )}
        </div>
    );
};

export default Contact;
