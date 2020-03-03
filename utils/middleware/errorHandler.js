const { config } = require("../../config");
const boom = require("@hapi/boom");

function withErrorStack(err, stack) {
  if (config.dev) {
    return {
      ...err,
      stack
    };
  }
  return err;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  // es posible que el error que nos llegue no se a de tipo boom
  // nosotros queremos que apartir de ahi todos los los errores tengan la estructura boom
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  // Si el error que estamos pasando por acá es de tipo boom
  // llamamos al siguiente midleware con el error
  next(err);
}

function errorHandler(err, req, res, next) {
  // Apartir del error que ya va a ser de tipo boom debemos sacar el output
  // esa es la manera de como le da manejo boom y ahi podemos saver el status code del error y el payload
  const {
    output: { statusCode, payload }
  } = err;
  // ahora necesitamos manejar el error.status, sino simplemente StatusCode
  res.status(statusCode);
  // acá en lugar de pasar el error message pasamos el payload
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};
