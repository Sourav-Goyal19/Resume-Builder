import './InputControl.css'

export const InputControl = ({ label, mandatory, onChange, ...props }) => {
    return (
        <div className='inputControl' style={{ flexDirection: props.type == "checkbox" && 'row' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label>{label}</label>
                <span style={{ color: 'red', textIndent: '5px' }}>{mandatory}</span>
            </div>
            <input type={props?.type || "text"} {...props} onChange={onChange} />
        </div>
    )
}

export default InputControl;