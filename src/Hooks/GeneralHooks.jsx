import { useState } from "react";

// this will store oprUnitName
export const UserId = () => {
    const userIdDet = JSON.parse(localStorage.getItem('userDetails'));
    const [userId, setUserId] = useState( userIdDet ? userIdDet.userId : null);
    return { userId, setUserId };
};

// this will store oprUnitName
export const UnitName = () => {
    const [oprUnitNameSel, setOprUnitNameSel] = useState('');
    return { oprUnitNameSel, setOprUnitNameSel };
};


// footer buttons hook to set access const [isActivated, setIsActivated] = useState(false);
export const FootBtnHook = () =>{
    const [btnStatus, setBtnStatus] = useState('');
    return { btnStatus, setBtnStatus };
}

// this will store OprUnitId
export const OprUnitId = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const [oprUnitId, setOprUnitId] = useState(userDetails ? userDetails.oprIdUsr : null); 
    return { oprUnitId, setOprUnitId };
}

// this will store module type Name as Direct/Indirect
export const OrgId = () => {
    const [orgId, setOrgId] = useState('1');
    return { orgId, setOrgId};
}

// this will store type of the user
export const Type = () => {
    const storedData = JSON.parse(localStorage.getItem('userDetails'));
    const [type, setType] = useState(storedData ? storedData.type : null);
    return { type, setType };
}

// this will store module type Name as Direct/Indirect
export const TypeName = () => {
    const [typeName, setTypeName] = useState('Direct');
    return { typeName, setTypeName};
}

// this will store segment Name 
export const SegmentName = () => {
    const [segmentName, setSegmentName] = useState('SPACEWOOD OFFICE SOLUTIONS PVT LTD');
    return { segmentName, setSegmentName };
}

// this will store id segment 
export const SegmentId = () => {
    const [segmentId, setSegmentId] = useState('1');
    return { segmentId, setSegmentId };
}

export const CurrencyId = () => {
    const oprDtlData = JSON.parse(localStorage.getItem('oprDtls'));
    const [currId, setCurrId] = useState(oprDtlData ? oprDtlData.ADOUM_CURRID : null);
    return { currId, setCurrId };
}

 


