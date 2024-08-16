import axios from 'axios';
import { toast } from "react-toastify";


const MasterFromDetails = async (formType,deptCode) => {
    // console.log(formType,deptCode);
    const userDet = await JSON.parse(localStorage.getItem('userDetails'));
    const userId = userDet.userId;
    const OprId = userDet.oprIdUsr;
    // console.log(formType,deptCode,userDet,userId,OprId);
    try {
        const response = await axios.post('/api/dashboard/formlist', { userId, OprId, formType, deptCode })    
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

export default MasterFromDetails;

