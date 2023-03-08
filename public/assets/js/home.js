import {navigate, api, url } from "./script.js"

$("document").ready(() => {
    api("/product","GET",null,(products) => {
        renderPizzas(products)
    })
})

function renderPizzas(products){
    if(!products) return
    
    products.map((product) => {
        const id = product.id

        const item = $("<div>").addClass("item")

        const itemHeader = $("<div>").addClass("item__header")

        const image = url + product.img
        const pizzaIMG = $("<img>").attr("src",image)
        pizzaIMG.attr("alt",`${product.nome}`)
        pizzaIMG.addClass("pizza__img")
        itemHeader.append(pizzaIMG)
        item.append(itemHeader)

        const itemMain = $("<div>").addClass("item__main")
        const itemName = $("<p>").addClass("item__name").text(product.nome)
        itemMain.append(itemName)
        item.append(itemMain)

        const itemFooter = $("<div>").addClass("item__footer")
        const itemPrice = $("<p>").addClass("item__price").text("R$ "+product.preco)
        itemFooter.append(itemPrice)
        item.append(itemFooter)

        item.click(() => {
            sessionStorage.setItem("pizzaID",id)
            navigate("/pizza.html")
        })
    
        $("#content").append(item)
    })
}