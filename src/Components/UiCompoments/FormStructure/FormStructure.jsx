import React from "react";
import HeaderTwo from "../../../screen/Header/HeaderTwo";
import FooterButtons from "../FooterButtons/FooterButtons";
import InputTagWithLabelButton from "../InputTag/InputTagWithLabelButton";

const FormStructure = (props) => {
    return (
        <>
            <HeaderTwo />
            <div style={{ textAlign: 'center', minHeight: '90vh', padding: '0% 1%', position: 'relative' }}>
                <div style={{ width: '90%', minHeight: '100%', marginLeft: 'auto', padding: '1% 5% 0% 5%', marginRight: 'auto', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' }}>
                    <p className='formHeading'><i>Work Order Wise Group</i></p>
                    <div style={{minHeight: '82.2vh', display:'flex', width: '100%', marginBottom: '8%' }}>
                        <div style={{ width: '80%'}}>
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />                          
                        </div>
                        <div style={{ width: '80%'}}>
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />
                            <InputTagWithLabelButton width='90%' searchWidth='20%' text="Group Code" placeholder="Group Code" />                           
                        </div>
                    </div>
                    <FooterButtons isReadOnlyNew={false} isReadOnlyView={false} isReadOnlyModify={true} isReadOnlyDelete={true} isReadOnlyClear={false} isReadOnlyClose={false} />
                </div>
            </div>
        </>
    )
}

export default FormStructure;
