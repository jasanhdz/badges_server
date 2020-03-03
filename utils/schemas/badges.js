const join = require("@hapi/joi");

// llamamos join.string para indicar que es un string
/**
 * llamamos reges porque ids de mongo tienen cierta estructura la cual es muy buena
 * forma de validarlo mediante un regex, porque son una collection de caracteres alphanumericos
 **/
// ^[0-9]: inicia con cualquiera de los caracteres alphanunericos del 0 al 9
// ^[0-9a-fA-F]: de la a minuscula a la f minuscula, y de la A mayuscula a la F mayúscula
// ^[0-9a-fA-F]{24}$/: puede tener un tamaño de 24 y así es com debe terminar.

const badgeIdSchema = join.string().regex(/^[0-9a-fA-F]{24}$/);
const badgeFistNameSchema = join.string().max(40);
const badgeLastNameSchema = join.string().max(40);
const badgeEmaiSchema = join.string().max(50);
const badgeJobTitleSchema = join.string().max(80);
const badgeTwitterSchema = join.string().max(40);
const badgeAvatarUrlSchema = join.string().max(80);
const badgeOrderSchema = join.number().min(1);

const createBadgeSchema = {
  firstName: badgeFistNameSchema.required(),
  lastName: badgeLastNameSchema.required(),
  email: badgeEmaiSchema.required(),
  jobTitle: badgeJobTitleSchema.required(),
  twitter: badgeTwitterSchema.required(),
  avatarUrl: badgeAvatarUrlSchema.required(),
  order: badgeOrderSchema
};

// Solo vamos a actualizar una parte de el Badge
const updateBadgeSchema = {
  firstName: badgeFistNameSchema,
  lastName: badgeLastNameSchema,
  email: badgeEmaiSchema,
  jobTitle: badgeJobTitleSchema,
  twitter: badgeTwitterSchema,
  avatarUrl: badgeAvatarUrlSchema
};

module.exports = {
  badgeIdSchema,
  createBadgeSchema,
  updateBadgeSchema
};
