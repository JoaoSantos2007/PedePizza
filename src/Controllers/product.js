import Products from "../Model/productModel.js"
import randomID from "../Model/randomID.js"

class productController{
    //add product
    static addProduct(req,res){
        const data = req.body

        Products.create({
            "id": randomID(),
            "nome": data.nome,
            "type": data.type,
            "preco": data.preco,
            "descricao": data.descricao,
            "img": data.img
        })
            .then((product) => {
                res.status(201).json({
                    "created": true,
                    product
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
        
    }

    //read products
    static getProducts(req,res){
        const id = req.params.id

        if(!!id){
            res.status(200).json(req.product) 
            return
        }

        Products.findAll()
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    //update product
    static updateProduct(req,res){
        const product = req.product
        const data = req.body

        product.update({
            "nome": data.nome,
            "type": data.type,
            "preco": data.preco,
            "img": data.img
        })
            .then((product) => {
                res.status(200).json({
                    "updated": true,
                    product
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    //delete product
    static deleteProduct(req,res){
        const product = req.product

        product.destroy()
            .then(() => {
                res.status(200).json({
                    "deleted": true
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

export default productController