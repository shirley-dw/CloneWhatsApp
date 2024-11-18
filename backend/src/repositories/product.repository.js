import Product from "../models/products.model.js"
// Capa logica de nuestra app para comunicar con la DB


class ProductRepository{
    // Método para crear un nuevo producto
    static async createProduct (new_product_data){
        const new_product = new Product(new_product_data);
        await new_product.save();
    }
    // Método para actualizar un producto
    static async updateProduct (product_id, updata_data){
        await Product.findByIdAndUpdate(product_id, updata_data);
    }
    //Obtener todos los productos
    static  async getAllProducts(){
        return await Product.find({active: true});
    }
    // Obtener un solo producto por su id
    static async getProductByid(product_id){
        return  Product.findById(product_id);
    }
    // Eliminar un producto por su id
    static async deleteProduct(product_id){
        // El { new:true } indica que debe devolver el porducto actualizado
        return Product.findByIdAndUpdate(product_id, {active: false}, {new: true});
    }

}


export default ProductRepository;