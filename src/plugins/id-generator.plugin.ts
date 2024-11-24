/**
 * Representa el plugin de generación de ID para el dominio. En este caso se utiliza el plugin uuid para generar un ID pero si mas adelante si necesita cambiar UUID o crear una implementacion propia se debe cambiar aqui.
 */
import { v4 as uuidv4 } from 'uuid'

export const idGeneratorPlugin = (): string => {
  return uuidv4()
}
