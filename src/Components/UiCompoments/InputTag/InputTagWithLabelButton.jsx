import GenCodeBtn from "../GenCodeBtn/GenCodeBtn"
import InputTag from "./InputTag"
import Label from "./Label"

const InputTagWithLabelButton = (props) => {
    return (
        <div className="d-flex flex-wrap" 
        style={{ width: props.width, height: '7%', display: 'flex' }}>
            <Label text="Group Code" width='18%'/>
            <InputTag width='53%' value={props.value} onChange={props.onChange} type={props.type} inputWidth='100%' placeholder={props.placeholder} />
            <GenCodeBtn btnText="Gen Group Cd" funCall={props.funCall} width='20%' height='50%'/>
        </div>
    )
}

export default InputTagWithLabelButton;