import axios from 'axios';
import { toast } from 'react-toastify';

const FinanceYear = async () => {
    try {
        const result = await axios.get('/api/general/finYear');     
        if (result) {
            const year =  result.data;
           return year;
        }
    } catch (error) {
        toast.error(error);
    }
}

export default FinanceYear;