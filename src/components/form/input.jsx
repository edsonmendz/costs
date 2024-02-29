import './input.css'

function Input({ type, text, name, placeholder, handleOnchange, value}) {
    return (
        <div className='form_control'>
            <label htmlFor={name}>{text}</label>
            <input 
            type={type}
            id={name} 
            name={name} 
            placeholder={placeholder} 
            onChange={handleOnchange} 
            value={value} />
        </div>
    )
}

export default Input