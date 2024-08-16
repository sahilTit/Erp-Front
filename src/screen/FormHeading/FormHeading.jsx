import Star from "../../Components/UiCompoments/Star/StarUi"

const FormHeading = (props) => {
    return (
        <>
            <h6 className='formHeading' style={{marginTop:'0%', zIndex:'0'}} ><i>{props.headingText}</i></h6>
            <div style={{ width: '4%', paddingLeft: '0%', marginLeft: '0%', position: 'absolute', right: '2%', top: '1%' }}>
                <Star adrmRightId={props.adrmRightId} />
            </div>

        </>
    )
}

export default FormHeading;