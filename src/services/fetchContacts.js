import axios from "axios";

export async function getContacts() {
    try {
        const { data } = await axios.get('https://cerulean-marlin-wig.cyclic.app/activities')
        // console.log(data)
        data.sort((a, b) => {
            const timeA = new Date(a.created_at).getTime();
            const timeB = new Date(b.created_at).getTime();

            return timeB - timeA;
        });
        return data

    } catch (error) {
        console.error(error)
    }
}