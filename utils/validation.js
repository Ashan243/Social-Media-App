const joi = require("joi")

export const validation = (users) =>{
    const schema = joi.object({

        email: joi.string().min(8).max(29).required(),
        password: joi.string().min(8).max(255).required(),
        username: joi.string().min(8).max(29)
    })

    return schema.validate(users)
}