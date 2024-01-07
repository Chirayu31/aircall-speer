import axios from "axios";

export async function getContactById(id) {
    try {
        const { data } = await axios
            .get(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`)
        // console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}