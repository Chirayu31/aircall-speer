import { Archive, Inbox, PhoneIncoming, PhoneMissed, PhoneOutgoing } from 'feather-icons-react/build/IconComponents';
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import contacts from '../atoms/ContactsAtom';
import { archiveContact } from '../services/archiveContact';
import page from '../atoms/PageAtom';

const ContactCard = ({ contact }) => {
    const setContacts = useSetRecoilState(contacts)
    const [active, setActive] = useRecoilState(page)

    const handleArchive = async (archived) => {
        await archiveContact(contact.id, { is_archived: archived })
        setContacts((prevContacts) =>
            prevContacts.map((prevContact) =>
                prevContact.id === contact.id ? { ...prevContact, is_archived: archived } : prevContact
            )
        );
    }

    const formattedTime = new Date(contact.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    const iconComponent =
        contact.call_type === 'missed' ?
            <PhoneMissed />
            :
            getIconComponent(contact.direction)

    const callTypeColor = getCallTypeColor(contact.call_type);

    return (
        <div
            className='my-2 min-w-full flex border-2 border-gray-600 px-4 py-3 rounded-lg  gap-2 justify-between items-center'

        >
            <div className={`flex gap-4 ${callTypeColor} cursor-pointer`} onClick={() => { setActive(contact.id) }}>
                {iconComponent && (
                    <>
                        {iconComponent}
                        <div className='flex flex-col'>
                            <p className='font-semibold text-black'>
                                {contact.to}
                            </p>
                            <p>
                                {contact.call_type}
                            </p>
                        </div>
                    </>
                )}
            </div>


            {
                active === 'inbox' ? (
                    <Archive
                        className='w-5 h-5 text-gray-500 hover:text-black'
                        onClick={() => { handleArchive(true) }}
                    />
                ) : (
                    <Inbox
                        className='w-5 h-5 text-gray-500 hover:text-black'
                        onClick={() => { handleArchive(false) }}
                    />
                )
            }


            <div className='flex flex-col'>
                <p className='font-semibold text-gray-500 tracking-wide'>
                    {formattedTime}
                </p>
            </div>
        </div>
    )
}

export default ContactCard


export const getIconComponent = (direction) => {
    switch (direction) {
        case 'inbound':
            return <PhoneIncoming />;
        case 'outbound':
            return <PhoneOutgoing />;
        default:
            return null;
    }
};

export const getCallTypeColor = (callType) => {
    switch (callType) {
        case 'missed':
            return 'text-red-500';
        case 'voicemail':
            return 'text-blue-500';
        default:
            return 'text-green-500';
    }
};
