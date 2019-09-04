import Joi from 'joi-browser';

export default function validator(test, keys) {
  const schema = Joi.object().keys(keys);
  return Joi.validate(test, schema);
}
