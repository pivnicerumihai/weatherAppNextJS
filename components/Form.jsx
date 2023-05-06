import React,{useState} from "react";


const Form = ({ name, label, error, ...rest }) => {

const [inputValue, setInputValue] = useState('test')

    return (
        <form className="form-group flex flex-col text-center font-medium text-lg" >
        <label className="py-5" htmlFor={name}>{label}</label>
        
        <input {...rest} name={name} id={name} value={inputValue} type="text" onChange={(e)=>{setInputValue(e.target.value)}} className='text-black rounded-lg text-sm p-2 w-80'  />
        {error && <div className="alert alert-danger">{error}</div>}
        <input type="submit" value="Submit" onSubmit={(e)=>{e.preventDefault()}} className="btn btn-primary my-5 w-20 self-center"  />
        </form>
    );
}

export default Form;