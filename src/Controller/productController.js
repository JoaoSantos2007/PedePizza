import Products from "../Model/productModel.js"
import randomID from "../Model/randomID.js"

class productController{
    //Create Pizza
    static createPizza(req,res){
        const data = req.body

        Products.create({
            "id": randomID(),
            "nome": data.nome,
            "preco": data.preco,
            "descricao": data.descricao,
            "img": data.img
        })
            .then((pizza) => {
                res.status(201).json({
                    "created": true,
                    pizza
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
        
    }

    //Read Pizzas
    static getPizzas(req,res){
        const id = req.params.id

        if(!!id){
            res.status(200).json(req.pizza) 
            return
        }

        Products.findAll()
            .then((pizzas) => {
                res.status(200).json(pizzas)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    //Update Pizza
    static updatePizza(req,res){
        const pizza = req.pizza
        const data = req.body

        pizza.update({
            "nome": data.nome,
            "preco": data.preco,
            "img": data.img
        })
            .then((pizza) => {
                res.status(200).json({
                    "updated": true,
                    pizza
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    //Delete Pizza
    static deletePizza(req,res){
        const pizza = req.pizza

        pizza.destroy()
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