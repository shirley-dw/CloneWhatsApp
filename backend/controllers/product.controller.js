import ProductRepository from "../src/repositories/product.repository.js"

// Crear un nuevo Producto
export const createProductController = async (req, res) => {
    try {
        const new_product = req.body
        const createdProduct = await ProductRepository.createProduct(new_product)
        res.status(200).json({ message: 'Producto creado con éxito', product: createdProduct })
        console.log(`Producto creado con éxito: ${createdProduct._id}`)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error })
        console.error('Error al crear el producto:', error.message)
    }
}

// Eliminar un producto por ID (actualizar estado a inactivo)
export const deleteProductController = async (req, res) => {
    try {
        const product_id = req.params.id
        const deletedProduct = await ProductRepository.deleteProduct(product_id)
        res.status(200).json({ message: 'Producto eliminado con éxito', product: deletedProduct })
        console.log(`Producto eliminado con éxito: ${product_id}`)
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error })
        console.error('Error al eliminar el producto:', error.message)
    }
}

// Actualizar un Producto
export const updateProductController = async (req, res) => {
    try {
        const product_id = req.params.id
        const updated_product = req.body
        const updatedProduct = await ProductRepository.updateProduct(product_id, updated_product)
        res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct })
        console.log(`Producto actualizado con éxito: ${product_id} - ${updatedProduct.title}`)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error })
        console.error('Error al actualizar el producto:', error.message)
    }
}

// Obtener todos los Productos
export const getAllProductController = async (req, res) => {
    try {
        const products = await ProductRepository.getAllProducts()
        res.status(200).json(products)
        console.log(`Total de productos obtenidos: ${products.length}`)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error })
        console.error('Error al obtener los productos:', error.message)
    }
}

// Obtener un producto por ID 
export const getProductByIdController = async (req, res, next) => {
    try {
        const product_id = req.params.id
        const product = await ProductRepository.getProductById(product_id)
        
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' })
            console.log(`Producto no encontrado: ${product_id}`)
        } else {
            res.status(200).json(product)
            console.log(`Producto obtenido: ${product_id} - ${product.title}`)
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error })
        console.error('Error al obtener el producto:', error.message)
    }
}
