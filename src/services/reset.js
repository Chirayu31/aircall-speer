import axios from "axios";

export async function reset() {
    try {
        const { data } = await axios.patch(`https://cerulean-marlin-wig.cyclic.app/reset`)
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}