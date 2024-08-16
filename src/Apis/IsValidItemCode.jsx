// FinYearOnDt

import axios from 'axios';
import { toast } from 'react-toastify';

const IsValidItemCode = async (orgId, oprUnitId, itemCd) => {
    try {
        const result = await axios.post('/api/validateInputData/isValidItemCd',{orgId, oprUnitId, itemCd});  
        console.log(' result data :-', result);   
        if (result.data.data) {
           return result.data.data;
        }
    } catch (error) {
        toast.error(error);
    }
}

export default IsValidItemCode;