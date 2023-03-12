import productModel from "../Models/product.js"

class product{
    //add product
    static create(req,res){
        const data = req.body

        productModel.create({
            "name": data.nome,
            "type": data.type,
            "description": data.description,
            "price": data.price,
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
    static get(req,res){
        const id = req.params.id

        if(!!id){
            res.status(200).json(req.product) 
            return
        }

        productModel.find()
            .then((products) => {
                res.status(200).json(products)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    //update product
    static update(req,res){
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
    static delete(req,res){
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

export default product