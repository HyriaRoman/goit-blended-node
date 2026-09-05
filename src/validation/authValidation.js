import { Joi, Segments } from 'celebrate';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().messages({
      'any.required': '`name` is required',
      'string.base': '`name` must be a string',
      'string.min': '`name` should have at least {#limit} characters',
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
