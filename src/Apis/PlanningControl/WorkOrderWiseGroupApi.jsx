import axios from "axios";
import { toast } from "react-toastify";


export const workOrdSave = async (tableData,userId) => {
    // console.log(tableData);
    try {
            const result = await axios.post('/api/data/insert',
                { tableData, userId });
            if (result) {
                toast.success("Added Successfully!")
            }
       
    } catch (error) {
        console.log(error);
    }
}

export const submitWorkOrdNum = async (GroupCd, FinYear, DeptCd, WorkOrdNo, DeptApmId) => {
    try {
        const result = await axios.post('/api/data/insert',
            { GroupCd, FinYear, DeptCd, WorkOrdNo, DeptApmId });
        if (result) {
            toast.success('Work Ordered Added!');
        }
    } catch (error) {
        toast.error(error);
    }
}

export  const groupCodeList = async (page) => {
    try {
        const result = await axios.get(`/api/forms/planning/workOrderGrupWise/getGroupCode?page=${page}`);
        if (result) {
            return result;
        }
    } catch (error) {
        toast.error(error);
    }    
}


export const DeptCodeList = async (page) => {
    try {
        const result = await axios.get(`/api/forms/planning/workOrderGrupWise/getDepart?page=${page}`);
        if (result) {
            // console.log(result);
            return result
        }
    } catch (error) {
        toast.error(error);
    }
}

export const genNewGrpCode = async () => {
    try {
        const result = await axios.get('/api/forms/planning/workOrderGrupWise/generateNewCode');
        if(result)
            return result;
    } catch (error) {
        toast.error(error);
    }
}


export const workOrdList = async (page, FinYear, DeptCd, deptAmpCd, DeptApmId, where, orgId, oprUnitId) => {
    try {
        const result = await axios.post(`/api/forms/planning/workOrderGrupWise/getOrdNo?page=${page}`, {
            FinYear, DeptCd, deptAmpCd, DeptApmId, where, orgId, oprUnitId
        });
        if (result) {
            console.log(result);
           return result;
        }
    } catch (error) {
        toast.error(error);
    }
}

export const searchDeptId = async ( searchAPMID ) => {
    alert("dept called!")
    console.log("function called");
    if (searchAPMID) {
        try {
            const response = await axios.get(`/api/forms/planning/workOrderGrupWise/getSearchDeptCode?data=${searchAPMID}`);
            return response.data.rows;
        } catch (error) {
            console.log(error);
        }
    } else {
        DeptCodeList(1);
    }
}

export const searchDeptName = async ( searchName ) => {
    // console.log("function called");
    if (searchName) {
        try {
            const response = await axios.get(`/api/forms/planning/workOrderGrupWise/getByName?data=${searchName}`);
            return response.data.rows;
        } catch (error) {
            console.log(error);
        }
    } else {
        DeptCodeList(1);
    }
}