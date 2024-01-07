import React from 'react'
import { useRecoilState } from 'recoil'
import page from '../atoms/PageAtom'
import { RefreshCcw } from 'feather-icons-react/build/IconComponents'
import { reset } from '../services/reset'
import contacts from '../atoms/ContactsAtom'
import { getContacts } from '../services/fetchContacts'

const activeClass = 'underline decoration-orange-400 underline-offset-4'

const Header = () => {
    const [contactsData, setContactsData] = useRecoilState(contacts);
    const [active, setActive] = useRecoilState(page)

    const fetchData = async () => {
        try {
            const data = await getContacts();
            setContactsData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefresh = async () => {
        await reset()
        await fetchData();
    }

    return (
        <div
            className='w-full bg-[#272727] text-white flex justify-around items-center px-10 rounded-t-[29px] h-20'
        >
            <h3 className='text-lime-300 text-3xl tracking-wide'>
                aircall
            </h3>

            <div className='w-[1.5px] h-10 bg-white'></div>

            <p
                className={`text-lg font-semibold tracking-wide cursor-pointer ${active === 'inbox' && activeClass} `}
                onClick={() => { setActive('inbox') }}
            >
                Inbox
            </p>

            <p
                className={`text-lg font-semibold tracking-wide cursor-pointer  ${active === 'archive' && activeClass}`}
                onClick={() => { setActive('archive') }}
            >
                Archived
            </p>
            <p className='cursor-pointer '>
                <RefreshCcw className='w-4 h-4' onClick={handleRefresh} />
            </p>
        </div>
    )
}

export default Header