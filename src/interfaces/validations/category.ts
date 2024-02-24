import Joi from "joi"
import { Request, Response } from "express";

export const categorySchema = (req: Request, res: Response, next) => {
    const schema = Joi.object({
      name: Joi.string(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    req.body = value;
    next();
  };