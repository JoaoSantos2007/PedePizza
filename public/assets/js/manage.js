import {handleDropZoneEvents, pizzaIMG} from "./drop-zone.js"
import {url, navigate, error } from "./script.js"
import {verifyUpdatePizzaMode} from "./update-pizza.js"

$(document).ready(() => {
    verifyUpdatePizzaMode()
    handleDropZoneEvents()
})

$("#cancelBTN").click(() => {
    navigate("/index.html")
})

$("#pizzaForm").on("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData();

    formData.append("nome",$("#inputName").val())
    formData.append("preco",$("#inputPreco").val())
    formData.append("descricao",$("#inputDescricao").val())
    formData.append("img", pizzaIMG)

    createPizza(formData)
})

function createPizza(pizza){
    const myUrl = url + "/pizza"

    fetch(myUrl,{
        method: 'POST',
        body: pizza,
    })
        .then((res) => {
            res.json()
                .then((data) => {
                    if(data.created) navigate("/index.html")
                })
                .catch((err) => {
                    error(err)
                })
        })
        .catch((err) => {
            error(err)
        })
}