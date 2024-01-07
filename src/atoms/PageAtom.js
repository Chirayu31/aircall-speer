import { atom } from 'recoil'

const page = atom({
    key: 'pageAtom',
    default: 'inbox'
})

export default page