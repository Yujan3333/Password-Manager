import Joi from "joi";

export const addVaultSchema = Joi.object({
  website: Joi.string().required(),
  email: Joi.string().email().required(),
  sitepassword: Joi.string().required(),
});

