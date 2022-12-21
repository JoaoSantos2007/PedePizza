import {url, requestInit} from "./script.js"

$("document").ready(() =>{

    const pizzaID = sessionStorage.getItem("pizzaID")
    if(!pizzaID) return

    const myUrl = url + `/pizza/${pizzaID}`
    const myInit = new requestInit("GET")

    fetch(myUrl,myInit)
        .then((res) => {
            res.json()
                .then((pizza) => {
                    renderPizza(pizza)
                })
                .catch((err) => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })
})

function renderPizza(pizza){
    $("#pizzaName").text(pizza.nome)
    $("#pizzaIMG").attr("src",url+pizza.img)
    $("#pizzaDescricao").text(pizza.descricao)
    $("#pizzaPreco").text(`${pizza.preco},00`)
}