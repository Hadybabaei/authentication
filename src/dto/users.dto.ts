import Joi from "joi";

const registerWithEmail = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
    password_confirm:Joi.string().required()
})
const registerWithPhone = Joi.object({
    phone_number:Joi.string().required(),
    password:Joi.string().required(),
    password_confirm:Joi.string().required()
})
 
const login = Joi.object({
    email:Joi.string(),
    phone_number:Joi.string(),
    password:Joi.string().required(),
})

const verificationEmail  = Joi.object({
    verification_code:Joi.string().required(),
})

const editUser = Joi.object({
    email:Joi.string().required(),
    phone_number:Joi.string(),
    password:Joi.string(),
    first_name:Joi.string(),
    last_name:Joi.string(),
    middle_name:Joi.string(),
    country:Joi.string(),
    country_tag:Joi.string(),

})
export default { login, registerWithEmail,verificationEmail,registerWithPhone ,editUser}; 