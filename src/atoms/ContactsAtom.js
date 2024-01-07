import { atom } from 'recoil'

const contacts = atom({
    key: 'contactsAtom',
    default: []
})

export default contacts