import { body } from "express-validator"
import { validateErrorsWithoutFiles } from "./validate.errors.js"

export const registerVehicle =[
    body('marca','Marca es requerida')
        .notEmpty(),
    body('modelo','Modelo es requerido')
        .notEmpty(),
    body('motor','Motor es requerido')
        .notEmpty(),
    body('placa','Placa es requerida')
        .notEmpty()
        .toUpperCase()
        .isLength({min:7,max:7}),
    body('color','Color es requerido')
        .notEmpty(),
    body('tracción','Tracción es requerido')
        .notEmpty(),
    validateErrorsWithoutFiles
]