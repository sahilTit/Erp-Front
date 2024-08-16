// MisLogRep

import axios from 'axios';
import { toast } from 'react-toastify';

const MisLogRep = async (orgId, oprId, fromDt, toDt, year, repOptn, userId, rightId, repDtl) => {
    try {
        const res = await axios.post('/api/genericLuv/reportLogs', { orgId, oprId, fromDt, toDt, year, repOptn, userId, rightId, repDtl });
    } catch (error) {
        toast.error(error);
    }
}

export default MisLogRep;