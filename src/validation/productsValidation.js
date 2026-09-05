import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

function objectIdValidator(value, helpers) {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
}

export const getAllProductsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().optional().default(1).min(1).messages({
      'number.base': '`page` must be an integer',
      'number.integer': '`page` must be an integer',
      'number.min': '`page` must be at least {#limit}',
    }),

    perPage: Joi.number()
      .integer()
      .optional()
      .default(10)
      .min(5)
      .max(20)
      .messages({
        'number.base': '`perPage` must be an integer',
        'number.integer': '`perPage` must be an integer',
        'number.min': '`perPage` must be at least {#limit}',
        'number.max': '`perPage` must be at most {#limit}',
      }),

    category: Joi.string()
      .optional()
      .valid(...CATEGORIES)
      .messages({
        'any.only': `\`tag\` must be one of: ${CATEGORIES.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),

    search: Joi.string().optional().default('').messages({
      'string.base': '`search` must be a string',
    }),
  }),
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().required().custom(objectIdValidator),
  }),
};

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(1).messages({
      'any.required': '`name` is required',
      'string.base': '`name` must be a string',
      'string.min': '`name` should have at least {#limit} characters',
    }),

    price: Joi.number().required().min(0).messages({
      'any.required': '`price` is required',
      'number.base': '`price` must be a number',
      'number.min': '`price` must be at least {#limit}',
    }),

    category: Joi.string()
      .optional()
      .valid(...CATEGORIES)
      .messages({
        'any.only': `\`tag\` must be one of: ${CATEGORIES.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),

    description: Joi.string().optional().default('').messages({
      'string.base': '`description` must be a string',
    }),
  }),
};

export const updateProductSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().required().custom(objectIdValidator),
  }),

  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().min(1).messages({
      'string.base': '`name` must be a string',
      'string.min': '`name` should have at least {#limit} characters',
    }),

    price: Joi.number().optional().min(0).messages({
      'number.base': '`price` must be a number',
      'number.min': '`price` must be at least {#limit}',
    }),

    category: Joi.string()
      .optional()
      .valid(...CATEGORIES)
      .messages({
        'any.only': `\`tag\` must be one of: ${CATEGORIES.join(', ')}`,
        'string.base': '`tag` must be a string',
      }),

    description: Joi.string().optional().default('').messages({
      'string.base': '`description` must be a string',
    }),
  }),
};
