import { useState } from "react";

export const MasterDetails = () => {
    const [masterForm,setMasterForm] = useState([]);
    return { masterForm,setMasterForm };
}

export const TransDetails = () => {
    const [transForm,setTransForm] = useState([]);
    return { transForm,setTransForm };
}

export const ReportDetails = () => {
    const [reportForm,setReportForm] = useState([]);
    return { reportForm,setReportForm };
}