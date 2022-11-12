import Pizzas from "../Model/pizzaModel.js"
import randomID from "../scripts/randomID.js"

class pizzaController{
    //Create Pizzas
    static async createPizza(req,res){
        const data = req.body

        const newPizza = {
            "id": randomID(),
            "nome": data.nome,
            "sabor": data.sabor,
            "preco": data.preco,
            "img": data.img
        }

        const pizza = await Pizzas.create(newPizza)
        let status = pizza ? 201 : 500

        res.status(status).send(pizza)
    }

    //Read Pizzas
    static async getPizzas(req,res){
        const id = req.params.id

        const pizzas = !id ? await Pizzas.findAll() : await Pizzas.findByPk(id)

        res.status(200).send(pizzas)
    }

    //Put Pizzas
    static async updatePizza(req,res){
        const id = req.params.id
        const data = req.body

        const updatePizza = {
            "nome": data.nome,
            "sabor": data.sabor,
            "preco": data.preco,
            "img": data.img
        }

        const updated = await Pizzas.update(updatePizza,{
            where: {
                id: id
            }
        })

        let status = updated ? 200 : 500

        res.status(status).send({"updated": !!updated})
    }

    //Delete Pizzas
    static async deletePizza(req,res){
        const id = req.params.id
        
        const deleted = await Pizzas.destroy({
            where: {
                id: id
            }
        })

        let status = deleted ? 200 : 500

        res.status(status).send({"deleted": deleted})
    }
}

export default pizzaController