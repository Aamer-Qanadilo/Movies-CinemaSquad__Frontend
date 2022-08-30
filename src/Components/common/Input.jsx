import React from 'react';

const Input = ({label, name, onChange, value, error, type, showPassword, setShowPassword}) => {
        let passwordShowButton;
        if(name === 'password') passwordShowButton = (showPassword ? 'fa-eye-slash' : 'fa-eye') ;
    return ( 
        <div className="form-group my-3">
                <label htmlFor={name} className="form-label">{label}</label>
                <div className="position-relative">
                        <input  id={name}
                                value={value}
                                onChange={onChange}
                                type={type}
                                className="form-control" />    
                        {(name === 'password') && <i className={`position-absolute 
                                                                ${passwordShowButton} 
                                                                show-password 
                                                                end-0 px-3 
                                                                fa-solid 
                                                                text-dark`}
                                                     onClick={()=>setShowPassword(!showPassword)}></i>
                        }
                </div>
                {error && (<div className="alert alert-danger">{error.split('"').join('')}</div>) }
        </div>
     );
}
 
export default Input;