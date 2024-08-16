// IsValidColorCode
import axios from 'axios';
import { toast } from "react-toastify";


const IsValidColorCode = async (orgId, colorCd) => {
    try {
        const response = await axios.post('/api/generic/IsValidColorCode', { orgId, colorCd })    
        if (response) {
            return response.data
        }
        else
            toast.error(response.response.data)
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data)
    }
}

export default IsValidColorCode;

