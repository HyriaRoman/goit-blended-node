import { Joi, Segments } from 'celebrate';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().messages({
      'any.required': '`email` is required',
      'string.base': '`email` must be a string',
      'string.email': '`email` must be a valid email',
    }),

    email: Joi.string().email().required().messages({
      'any.required': '`email` is required',
      'string.base': '`email` must be a string',
      'string.min': '`email` should have at least {#limit} characters',
    }),

    password: Joi.string().required().min(8).messages({
      'any.required': '`password` is required',
      'string.base': '`password` must be a string',
      'string.min': '`password` should have at least {#limit} characters',
    }),
  }),
};

export const loginSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': '`email` is required',
      'string.base': '`email` must be a string',
      'string.email': '`email` must be a valid email',
    }),

    password: Joi.string().required().messages({
      'any.required': '`password` is required',
      'string.base': '`password` must be a string',
    }),
  }),
};
