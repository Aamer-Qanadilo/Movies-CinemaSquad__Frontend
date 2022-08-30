import Joi from "joi";
import Input from "./Input";

export const validateInput = (inputName, inputValue, inputSchema) => {
        
    const inputToValidate = {
        [inputName]: inputValue
    }


    const fieldSchema = Joi.object({
        [inputName]: inputSchema 
    })

    const validation = fieldSchema.validate(inputToValidate);

    if(!validation.error){
        return {[inputName]: ''};
    }
    return {[inputName]: validation.error.details[0].message};
}

export const validateForm = (inputs, schema, options={abortEarly: false}) => {
    let newUser = {...inputs};
    const validation = schema.validate(newUser, options);
    let errors = {};
    if(!validation.error){
        return null;
    }
    for(let error of validation.error.details){
        errors[error.path[0]] = error.message;
    }
    return errors;
}

export const renderInput = (label, name, type = 'text', inputs, errors, handleChangeInput, showPassword, setShowPassword) =>{
    return (
        <Input  label={label}
                name={name}
                value={inputs[name]}
                onChange={handleChangeInput}
                error={errors[name]}
                type={type} 
                showPassword={showPassword}
                setShowPassword={setShowPassword} />
    );
};


export const renderButton = (label, classes, inputs, schema, loadingForm) => {
    return (<button type="submit"
                    className={classes}
                    disabled={validateForm(inputs, schema) || loadingForm}>    {label} {loadingForm? <i className="fa fa-spinner fa-spin"></i>:''}    </button>);
}