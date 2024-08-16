// SystemParamValue

import axios from 'axios';
import { toast } from 'react-toastify';

const SystemParamValue = async (aParam, orgId, oprId) => {
    try {
        const result = await axios.post('/api/general/getSystemParamValue',{aParam, orgId, oprId});
        // console.log(result.data.data);     
        if (result.data.data) {
            if(result.data.data.OPRVAL === null){
                if(result.data.data.ORGVAL === null)
                    return result.data.data.GVAL;
                else
                    return result.data.data.ORGVAL;
            }else{
                return result.data.data.OPRVAL;
            }
        }
    } catch (error) {
        toast.error(error);
    }
}

export default SystemParamValue;

// if (MpLibDb.isNull(obj[2])) {
//     if (MpLibDb.isNull(obj[1])) {
//         return obj[0].toString();
//     } else {
//         return obj[1].toString();
//     }
// } else {
//     return obj[2].toString();
// }