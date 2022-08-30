import React, { useState } from 'react';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { renderButton, renderInput, validateForm, validateInput } from '../common/Form';

function Login({isLoggedIn, setIsLoggedIn, loadingForm, setLoadingForm}) {

    const [showPassword, setShowPassword] = useState(false);

    const [inputs , setInputs] = useState( {
        email: '',
        password: '',
    });

    const [errors , setErrors] = useState( {
        email: '',
        password: '',
    });

    const schema = Joi.object({
        email: Joi.string()
                  .min(3).max(50)
                  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                  .required().label('Email'),

        password: Joi.string().max(40)
                     .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
                     .required()
                     .messages({
                        'string.base': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                        'string.empty': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                        'string.pattern.base': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                        'any.required': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`
                      }),
    });

    const navigater = useNavigate();

    const handleInputChange = (event) => {
        let newInputs = {...inputs};
        newInputs[event.target.id] = event.target.value;
        setInputs(newInputs);

        const error = validateInput(event.target.id, event.target.value, schema.extract(event.target.id));
        let newErrors = {...errors, ...error};
        setErrors(newErrors);
    }

    const submitForm = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(inputs, schema, {abortEarly:false});
        setLoadingForm(true);
        
        // If Any errors occured then we enter this if statement
        if(validationErrors){
            setErrors({...errors, ...validationErrors});

            return;
        }


        // This isn't the right way to get the token, it should be generated from the back-end side
        setTimeout(()=>{
            setLoadingForm(false);
            toast.success("Welcome back!");
            let name = inputs.email.split("@")[0];
            let token = {
                name: name
            };
            localStorage.setItem("token",JSON.stringify(token));
            setIsLoggedIn(true);

            
            navigater('/', {replace:true});
        }, 5000)
        
    }

    

    return ( 
    <React.Fragment>
        <h2 className='my-5'>Login form</h2>
        <form onSubmit={submitForm}>
            {renderInput('Email', 'email', 'email', inputs , errors, handleInputChange)}
            {renderInput('Password', 'password', (showPassword ? 'text': 'password'), inputs , errors, handleInputChange, showPassword, setShowPassword)}

            {renderButton('Login', 'btn btn-info mt-3', inputs, schema, loadingForm)}
        </form>
    </React.Fragment> );
}

export default Login;