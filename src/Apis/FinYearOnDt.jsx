// FinYearOnDt

import axios from 'axios';
import { toast } from 'react-toastify';

const FinYearOnDt = async (toFinDt) => {
    try {
        const result = await axios.post('/api/general/finYearOnDt',{toFinDt});  
        // console.log(' result data :-', result);   
        if (result) {
            const year =  result.data;
           return year;
        }
    } catch (error) {
        toast.error(error);
    }
}

export default FinYearOnDt;