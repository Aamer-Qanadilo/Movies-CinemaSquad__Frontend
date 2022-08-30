import React, { useState } from "react";
import Joi from "joi";

import { useNavigate } from 'react-router-dom';
import Input from "../common/Input";
import { renderButton, renderInput, validateForm, validateInput } from "../common/Form";



function Register({loadingForm, setLoadingForm}) {

    const [showPassword, setShowPassword] = useState(false);

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        age: '',
        password: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
        password: '',
        email: '',
    });

    const schema = Joi.object({
        firstName: Joi.string()
            .min(3).max(25)
            .required()
            .label('First Name'),

        lastName: Joi.string()
            .min(3).max(25)
            .required()
            .label('Last Name'),

        age: Joi.number()
            .min(0).max(80)
            .required().label('Age'),

        password: Joi.string().max(40)
            .regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
            .required()
            .messages({
                'string.base': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                'string.empty': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                'string.pattern.base': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
                'any.required': `Password should be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character`
            }),

        email: Joi.string()
            .min(3).max(50)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required().label('Email'),
    });


    const navigater = useNavigate();

    const submitForm = (event) => {
        event.preventDefault();

        let newErrors = { ...errors };
        const formErrors = validateForm(inputs, schema, { abortEarly: false });

        setLoadingForm(true);

        if (formErrors) {
            newErrors = { ...newErrors, ...formErrors };
            console.log(newErrors);
            setErrors(newErrors);

            

            return;
        }


        // This isn't the right way, we should send the entered data to the back-end side
        setTimeout(()=>{
            setLoadingForm(false);
            console.log('Submited');
            navigater('/login', { replace: true });
        }, 5000);

    }



    const handleChangeInput = (event) => {
        let newUser = { ...inputs };
        newUser[event.target.id] = event.target.value;
        setInputs(newUser);

        const error = validateInput(event.target.id, event.target.value, schema.extract(event.target.id));
        const newErrors = { ...errors, ...error };
        console.log(newErrors);
        setErrors(newErrors);
    };



    return (
        <React.Fragment>
            <h2 className="mt-5">Registeration form</h2>
            <form onSubmit={submitForm}>
                {renderInput('First Name', 'firstName', 'text', inputs, errors, handleChangeInput)}
                {renderInput('Last Name', 'lastName', 'text', inputs, errors, handleChangeInput)}
                {renderInput('Age', 'age', 'number', inputs, errors, handleChangeInput)}
                {renderInput('Email', 'email', 'email', inputs, errors, handleChangeInput)}
                {renderInput('Password', 'password', (showPassword ? 'text': 'password'), inputs, errors, handleChangeInput, showPassword, setShowPassword)}


                {renderButton('Register', "btn btn-primary mt-3", inputs, schema, loadingForm)}
            </form>
        </React.Fragment>

    );
}

export default Register;