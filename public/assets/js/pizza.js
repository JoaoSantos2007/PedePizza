import {url, api} from "./script.js"

$("document").ready(() =>{

    const pizzaID = sessionStorage.getItem("pizzaID")
    if(!pizzaID) return

    api(`/pizza/${pizzaID}`,"GET",null,(pizza) => {
        renderPizza(pizza)
    })
})

function renderPizza(pizza){
    $("#pizzaName").text(pizza.nome)
    $("#pizzaIMG").attr("src",url+pizza.img)
    $("#pizzaDescricao").text(pizza.descricao)
    $("#pizzaPreco").text(`${pizza.preco},00`)
}