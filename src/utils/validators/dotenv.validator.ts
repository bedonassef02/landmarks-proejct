import * as Joi from 'joi';

export const dotenvValidator: Joi.ObjectSchema<any> = Joi.object({
  APP_PORT: Joi.number().port().default(3000),
  APP_URL: Joi.string().uri(),

  DATABASE_USERNAME: Joi.string(),
  DATABASE_NAME: Joi.string(),
  DATABASE_PASSWORD: Joi.string(),
  DATABASE_URI: Joi.string().uri(),

  JWT_SECRET_KEY: Joi.string(),
  JWT_EXPIRES_IN: Joi.string(),

  COOKIE_TOKEN_MAX_AGE_DAYS: Joi.number().min(1),
});
