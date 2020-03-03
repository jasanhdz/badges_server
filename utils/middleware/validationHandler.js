// Para devolver un error Boom, requerimos boom
const boom = require("@hapi/boom");
const join = require("@hapi/joi");

// validate va a recibir la data que va ha validar
// y va ha recibir un schema
function validate(data, schema) {
  // vamos a obtener un errro en caso de que el shema
  // no se valido con la data
  // Antigua implementación de join
  // const {error} = join.validate(data, schema)
  // NUEVA IMPLEMENTACIÓN DE JOIN
  // ahora el schema valida la data
  const { error } = schema.validate(data, { erros: { stack: true } });
  return error;
}

function validationHandler(schema, check = "body") {
  return function(req, res, next) {
    const error = validate(req[check], schema);

    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
