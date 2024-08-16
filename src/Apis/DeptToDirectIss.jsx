// DeptToDirectIss

import axios from 'axios';
import { toast } from 'react-toastify';

const DeptToDirectIss = async (apmId) => {
    try {
        const result = await axios.post('/api/general/getDeptToDirectIss',{apmId});  
        // console.log('DeptToDirectIss :->',  result.data.data);
        if (result.data) 
            return result.data.data;           
        
    } catch (error) {
        toast.error(error);
    }
}

export default DeptToDirectIss;
