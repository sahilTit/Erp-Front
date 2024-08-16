
import axios from 'axios';
import { toast } from 'react-toastify';

const ValidationApi = async (orgId, city) => {
    try {
        let where = `AND PUCM_CITY_CD LIKE` + "'%" + city.toUpperCase() + "%' ";
        const result = await axios.post('/api/genericLuv/getCityList', { where, orgId });     
        if (result.data.data.length > 0) {
            console.log(result.data.data[0]);
           return true;
        }else{
            return false;
        }
    } catch (error) {
        toast.error(error);
    }
}

export default ValidationApi;