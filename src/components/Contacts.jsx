import React, { useEffect, useState } from 'react';
import { getContacts } from '../services/fetchContacts';
import { useRecoilState } from 'recoil';
import contacts from '../atoms/ContactsAtom';
import ContactCard from './ContactCard';
import { Archive, Inbox } from 'feather-icons-react/build/IconComponents';
import page from '../atoms/PageAtom';
import { archiveContact } from '../services/archiveContact';

export function formatDate(created_at) {
    const dateObject = new Date(created_at);
    const formattedDate = `${dateObject.getDate().toString().padStart(2, '0')}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getFullYear()}`;
    return formattedDate;
}

const groupContactsByDate = (contacts) => {
    const groupedContacts = {};

    contacts.forEach((contact) => {
        const formattedDate = formatDate(contact.created_at)

        if (!groupedContacts[formattedDate]) {
            groupedContacts[formattedDate] = [];
        }

        groupedContacts[formattedDate].push(contact);
    });

    return groupedContacts;
};



const Contacts = () => {
    const [contactsData, setContactsData] = useRecoilState(contacts);
    const [active, setActive] = useRecoilState(page)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleArchiveAll = async () => {
        try {
            for (const contact of inboxContacts) {
                await archiveContact(contact.id, { is_archived: true });
            }

            const updatedContacts = inboxContacts.map((contact) => ({ ...contact, is_archived: true }));
            setContactsData([...updatedContacts, ...archivedContacts]);
        } catch (error) {
            console.error('Error archiving all contacts:', error);
        }
    };

    const handleUnarchiveAll = async () => {
        try {
            const unarchivedContactIds = [];

            for (const contact of archivedContacts) {
                await archiveContact(contact.id, { is_archived: false });
                unarchivedContactIds.push(contact.id);
            }

            const updatedContacts = archivedContacts.map((contact) => ({ ...contact, is_archived: false }));
            setContactsData([...inboxContacts, ...updatedContacts]);
        } catch (error) {
            console.error('Error unarchiving all contacts:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getContacts();
                setContactsData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className='mt-10 text-yellow-500 text-xl text-center'>Loading...</div>;
    }

    if (error) {
        return <div className='mt-10 text-red-500 text-xl text-center'>Error fetching contacts: {error.message}</div>;
    }

    const inboxContacts = contactsData.filter((contact) => !contact.is_archived);
    const archivedContacts = contactsData.filter((contact) => contact.is_archived);
    const visibleContacts = active === 'inbox' ? inboxContacts : archivedContacts
    const groupedContacts = groupContactsByDate(visibleContacts);

    return (
        <div className='flex flex-col items-center px-6'>
            {active === 'inbox' ? (
                <button
                    className='flex justify-center items-center gap-2 border-2 border-[#272727] text-2xl rounded-xl w-full -mt-2 py-2'
                    onClick={handleArchiveAll}
                >
                    <Archive />
                    Archive All Calls
                </button>
            ) : (
                <button
                    className='flex justify-center items-center gap-2 border-2 border-[#272727] text-2xl rounded-xl w-full -mt-2 py-2'
                    onClick={handleUnarchiveAll}
                >
                    <Inbox />
                    Unarchive All Calls
                </button>
            )}


            {Object.keys(groupedContacts).length > 0 ? (

                Object.keys(groupedContacts).map((date) => (

                    <div key={date} className='w-full my-2'>

                        <h2 className='text-lg text-center text-gray-500 font-semibold'>
                            {date}
                        </h2>

                        {groupedContacts[date].map((contact) => {
                            if (contact.to) {
                                return (
                                    <ContactCard key={contact.id} contact={contact} />
                                )
                            }
                        })}

                    </div>
                ))
            ) : (
                <div>No non-archived contacts found.</div>
            )}
        </div>
    );
};

export default Contacts;