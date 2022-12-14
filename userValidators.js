const Joi = require("joi");

const userSchema = Joi.object({
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    email: Joi.string().max(255).required(),
    city: Joi.string().max(255),
    language: Joi.string().max(255),
});

const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language } = req.body;

    const { error } = userSchema.validate(
        { firstname, lastname, email, city, language },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
}

module.exports = validateUser;