import { Joi, Segments } from 'celebrate';

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
  }),
};
