import axios from 'axios';
import { toast } from "react-toastify";


const ItemCodeList = async (orgId,where) => {
    try {
        const response = await axios.post('/api/generic/getItemCodeList', { orgId, where })    
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

export default ItemCodeList;

