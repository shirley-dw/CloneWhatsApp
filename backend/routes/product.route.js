import express from 'express'
import { createProductController, deleteProductController, updateProductController, getAllProductController, getProductByIdController} from '../controllers/product.controller.js'

const productRouter = express.Router()

// Obtener todos los productos
productRouter.get('/', getAllProductController)
// Obtener un producto por ID
productRouter.get('/:product_id', getProductByIdController)
// Crear un nuevo producto
productRouter.post('/', createProductController)
// Actualizar un producto por ID
productRouter.put('/:product_id', updateProductController)
// Eliminar un producto por ID
productRouter.delete('/:product_id', deleteProductController)

export default productRouter
