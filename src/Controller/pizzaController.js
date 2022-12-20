import Pizzas from "../Model/pizzaModel.js"
import randomID from "../scripts/randomID.js"

class pizzaController{
    //Create Pizza
    static createPizza(req,res){
        const data = req.body

        Pizzas.create({
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
        console.log("Ok")
        const id = req.params.id

        if(!!id){
            res.status(200).json(req.pizza) 
            return
        }

        Pizzas.findAll()
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

export default pizzaController