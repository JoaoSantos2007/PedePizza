import { handleDropZoneEvents, pizzaIMG } from "./drop-zone.js"
import {url, navigate } from "./script.js"
import { verifyUpdatePizzaMode } from "./update-pizza.js"

$(document).ready(() => {
    verifyUpdatePizzaMode()
    handleDropZoneEvents()
})

$("#pizzaForm").on("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData();

    formData.append("nome",$("#inputName").val())
    formData.append("preco",`$("#inputPreco").val().00`)
    formData.append("descricao",$("#inputDescricao").val())
    formData.append("img", pizzaIMG)
    const myUrl = url + "/pizza"

    fetch(myUrl,{
        method: 'POST',
        body: formData,
    })
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
})

$("#cancelBTN").click(() => {
    exit()
})

function exit(){
    navigate("/index.html")
}