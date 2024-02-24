import Joi from "joi"

export const signupValidationSchema = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string(),
      job_title: Joi.string(),
      company_name: Joi.string(),
      confirm_password: Joi.string(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      password: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    req.body = value;
    next();
  };

  export const loginValidationSchema = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string(),
      password: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    req.body = value;
    next();
  };