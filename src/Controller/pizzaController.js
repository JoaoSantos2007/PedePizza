import Pizzas from "../Model/pizzaModel.js"
import randomID from "../scripts/randomID.js"

class pizzaController{
    //Get Pizzas
    static async getPizzas(req,res){
        const id = req.params.id

        const pizzas = await Pizzas.findAll()

        res.status(200).send(pizzas)
    }


    //Post Pizzas
    static async addPizzas(req,res){
        const data = req.body
        data["id"] = randomID()

        const pizza = await Pizzas.create(data)

        res.status(201).send(pizza)
    }


    //Put Pizzas
    static async updatePizza(req,res){
        const id = req.params.id
        const data = req.body

        const pizza = await Pizzas.findByPk(id)
        pizza.update(data)

        res.status(200).send(pizza)
    }


    //Delete Pizzas
    static async deletePizza(req,res){
        const id = req.params.id
        
        await Pizzas.destroy({
            where: {
                id: id
            }
        })

        res.status(200).send("deleted")
    }
    
}

export default pizzaController