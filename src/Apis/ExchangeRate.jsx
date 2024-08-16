// MisLogRep

import axios from 'axios';
import { toast } from 'react-toastify';

const getExchangeRate = async (orgId, oprId, currID) => {
    try {
        const result = await axios.post('/api/generic/exchgrate',{orgId, oprId, currID});  
        console.log(' result data :-',  result.data, result.data.exRate);   
        if (result) {
            const year =  result.data.exRate;
           return year;
        }
    } catch (error) {
        toast.error(error);
    }
}

export default getExchangeRate;