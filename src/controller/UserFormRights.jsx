import axios from "axios";
import { toast } from "react-toastify";

const UserFormRights = async (adrmModuleId, adrmType, adrmRightId) => {
    // console.log(adrmRightId, 'adrmRightId');
    try {
        const userDet = await JSON.parse(localStorage.getItem('userDetails'));
        if (userDet !== null) {
            const userId = userDet.userId;
            const OprId = userDet.oprIdUsr;
            const result = await axios.post('/filePath', { userId, OprId, adrmModuleId, adrmType, adrmRightId });
            if (result) {
                const data = result.data.filter((item) => item.ADRM_RIGHT_ID === adrmRightId);
                return data;
            }
        }
    } catch (error) {
        toast.error(error);
    }
}

export default UserFormRights;