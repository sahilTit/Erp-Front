
import axios from 'axios';
import { toast } from 'react-toastify';

const GetOprUnitName = async () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const oprId = userDetails.oprIdUsr;
    // console.log(userDetails);
    try {
        const result = await axios.post('/api/general/getOprunitName',{ oprId });
        // console.log(result);
        if (result) {
            const year =  result.data;
            const details = {
                userId:userDetails.userId,
                unitName:year
            }
            // console.log(details);
           return details;
        }
    } catch (error) {
        toast.error(error);
    }
}

export default GetOprUnitName;