import axios from "axios";

export async function archiveContact(id, postData) {
    try {
        const { data } = await axios.patch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, postData)
        // console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}