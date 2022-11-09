const { check } = require("express-validator");
const { validateToken } = require("../config/tokens");
const { Users } = require("../models");

function validateAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
}

const validateRegister = [
  check("name")
    .notEmpty()
    .withMessage("Ingrese datos en el campo nombre")
    .custom((value, { req }) => !req.body.isAdmin)
    .withMessage("Peticion no valida")
    .custom((value, { req }) => !req.body.SuperAdmin)
    .withMessage("Peticion no valida"),
  check("address")
    .notEmpty()
    .withMessage("Ingrese datos en el campo direccion"),
  check("email")
    .notEmpty()
    .withMessage("Ingrese datos en el campo email")
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage("Ingrese un correo valido")
    .custom((value) => {
      return Users.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("Este E-mail ya esta utilizado");
        }
      });
    }),
  check("pass")
    .notEmpty()
    .withMessage("Ingrese datos en el campo contraseña")
    .bail()
    .matches(/\d/)
    .withMessage("Debe contener por lo menos un numero")
    .matches(/[A-Z]/)
    .withMessage("Debe contener por lo menos una letra mayuscula")
    .matches(/[a-z]/)
    .withMessage("Debe contener por lo menos una letra minuscula")
    .matches(/\W/)
    .withMessage("Debe contener por lo menos un caracter especial")
    .isLength({ min: 6 })
    .withMessage("Debe contener minimo 6 caracteres"),
];

const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Ingrese datos en el campo email")
    .bail()
    .normalizeEmail()
    .isEmail()
    .withMessage("Ingrese un correo valido")
    .bail()
    .custom((value) => {
      return Users.findOne({ where: { email: value } }).then((user) => {
        if (!user) {
          return Promise.reject("Este E-mail no existe");
        }
      });
    }),
  check("pass").notEmpty().withMessage("Ingrese datos en el campo contraseña"),
];

const validateUpdate = [
  check("email")
    .custom((value, { req }) => !req.body.isAdmin)
    .withMessage("Peticion no valida")
    .custom((value, { req }) => !req.body.SuperAdmin)
    .withMessage("Peticion no valida"),
];

const validateAdmin = [
  check("token")
    .custom((value, { req }) => {
      const { user } = validateToken(value);
      return user.isAdmin == true;
    })
    .withMessage("No tiene autorizacion para ingresar a esta ruta"),
];

const valideSuperAdmin = [
  check("token")
    .custom((value, { req }) => {
      const { user } = validateToken(value);
      return user.SuperAdmin == true;
    })
    .withMessage("No tiene autorizacion para ingresar a esta ruta"),
];

const validateBuy = [
  check("cardNumber")
    .notEmpty()
    .withMessage("Ingrese datos en el campo contraseña")
    .bail()
    .isLength({ min: 13, max: 18 })
    .isNumeric()
    .withMessage("Ingrese una tarjeta valida"),
  check("cardExpiration")
    .notEmpty()
    .withMessage("Ingrese datos en el campo de fecha de expiracion")
    .bail()
    .matches(/(0*[01-12]\d)([/])(0*[23-99]\d)/g)
    .withMessage("Ingrese una fecha de expiracion valida"),
  check("cardCode")
    .notEmpty()
    .withMessage("Ingrese datos en el campo codigo")
    .bail()
    .isLength({ min: 3, max: 3 })
    .isNumeric()
    .withMessage("Ingrese un codigo valido"),
  check("cardName").notEmpty().withMessage("Ingrese datos en el campo nombre"),
];

module.exports = {
  validateAuth,
  validateRegister,
  validateLogin,
  validateUpdate,
  validateAdmin,
  valideSuperAdmin,
  validateBuy,
};
